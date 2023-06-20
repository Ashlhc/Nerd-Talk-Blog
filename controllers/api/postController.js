const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// GET ROUTE - ALL
router.get("/",(req,res)=>{
    Post.findAll({
        include: {
            model: User
        }
    })
    .then(Posts=>{
        res.json(Posts);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occured",err});
    });
});

// GET ROUTE - SINGULAR BY ID
router.get("/:id",(req,res)=>{
    Post.findByPk(req.params.id,{
        include: {
            model: User
        }
    })
    .then(Post=>{
        res.json(Post);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occured",err});
    });
});

// POST ROUTE
// JSON FORMAT
// title: STRING
// body: TEXT,
// user_id: INT
router.post("/",(req,res)=>{
    Post.create({
        title: req.body.title,
        body: req.body.body,
        UserId: req.body.user_id
    })
    .then(newPost=>{
        res.json(newPost);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occured",err});
    });
})

// UPDATE ROUTE
router.put("/:id",async (req,res)=>{
    // TODO: add error catching
    const { title, body } = req.body;
    try {
        const post = await Post.findByPk(req.params.id)
        if (title) {
            post.title = title;
            post.save();
        }
        if (body) {
            post.body = body;
            post.save();
        }
        res.json(post);
    } catch (err) {
        console.error(err);
    }
})

// DELETE ROUTE
router.delete("/:id",(req,res)=>{
    Post.destroy({
        where:{
            id: req.params.id
        }})
    .then(delPost=>{
        if (!delPost) {
            res.json({msg:"No post to delete.",result:delPost})
        } else {
            res.json({msg:"Post deleted successfully.",result:delPost});
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occured",err});
    });
})

module.exports = router;