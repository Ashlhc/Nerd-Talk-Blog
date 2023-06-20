const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// GET ROUTE - ALL
router.get("/",(req,res)=>{
    Comment.findAll()
    .then(comments=>{
        res.json(comments);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occured",err});
    });
});

// GET ROUTE - SINGULAR BY ID
router.get("/:id",(req,res)=>{
    Comment.findByPk(req.params.id)
    .then(comment=>{
        res.json(comment);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occured",err});
    });
});

// POST ROUTE
// JSON FORMAT
// body: TEXT
// post_id: INT
// user_id: INT
router.post("/",(req,res)=>{
    Comment.create({
        body: req.body.body,
        PostId: req.body.post_id,
        UserId: req.body.user_id
    })
    .then(newComment=>{
        res.json(newComment);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occured",err});
    });
})

// DELETE ROUTE
router.delete("/:id",(req,res)=>{
    Comment.destroy({
        where:{
            id: req.params.id
        }})
    .then(delComment=>{
        if (!delComment) {
            res.json({msg:"No comment to delete.",result:delComment})
        } else {
            res.json({msg:"Comment deleted successfully.",result:delComment});
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occured",err});
    });
})

module.exports = router;