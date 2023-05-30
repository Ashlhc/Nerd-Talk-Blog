const router = require("express").Router();
const { Comment } = require("../../models");


router.get("/",(req,res)=>{
    Comment.findAll()
    .then(comments=>{
        res.json(comments);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occured",err});
    });const router = require('express').Router();
    const { Comment } = require('../../models');
    const withAuth = require('../../utils/auth');
    
    router.get('/', (req, res) => {
      Comment.findAll()
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    });
    
    router.post('/', withAuth, (req, res) => {
      //Check for a session
      if (req.session) {
        Comment.create({
          comment_text: req.body.comment_text,      
          post_id: req.body.post_id,
          user_id: req.session.user_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
      }
    });
    
    router.delete('/:id', (req, res) => {
      Comment.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbCommentData => {
          if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
          }
          res.json(dbCommentData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });
    
    module.exports = router;
});


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


router.delete("/:id",(req,res)=>{
    Comment.destroy({
        where:{
            id: req.params.id
        }})
    .then(deleteComment=>{
        if (!deleteComment) {
            res.json({msg:"No comment to delete.",result:deleteComment})
        } else {
            res.json({msg:"Comment deleted successfully.",result:deleteComment});
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occured",err});
    });
})

module.exports = router;