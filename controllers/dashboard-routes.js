const express = require('express');
const router = express.Router();
const {User,Post,Comment} = require('../models');
const withAuth = require('../utils/auth');


router.get("/", withAuth, (req,res)=>{
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'post_content',
            'created_at'
        ],
        include: [{
            model: User,
            attributes: ['username']
        },
    {
        model:Comment,
        attributes: [ 'id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
            model: User,
            attributes: ['username']
        }
    }
]
    }).then(postData=>{
        const posts = postData.map(post=>post.get({plain:true}));
        res.render('dashboard',{ 
            posts,
            logged_in: true
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    });

router.get("/edit/:id",withAuth, (req,res)=>{
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
        include: [{
            model: User,
            attributes: ['username']
        },
    {
        model: Comment,
        attributes: ['id', 'comment_text','post_id', 'user_id', 'created_at'],
        include: {
            model: User,
            attributes: ['username']
        }
    }
]
    }).then(postData=>{
       if (!postData) {
        res.status(404).json({msg: 'No post found by this id'}); 
        return;
       }
       const post = postData.get({ plain: true});
       res.render('edit-post', {
        post,
        loggedIn: req.session.loggedIn
       });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/new', (req,res)=>{
    res.render('new-post');
});

module.exports = router;

