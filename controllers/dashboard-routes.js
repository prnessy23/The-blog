const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

// display posts dashboard
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'post_text',
            'title',
            'createdAt'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData =>{
        const posts =dbPostData.mao(post => post.get({plain: true}));
        res.render('dashboard',{posts,loggedIn: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id',
                    'post_text',
                    'title',
                    'create_at'
                ],
                include:[
                    {
                        model: User,
                        attributes: ['username']
                    },
                    {
                        model: Comment,
                        attributes: ['id','comment_text','post_id','user_id','created_at'],
                        include: {
                            model: User,
                            attributes: ['username']
                        }
                    }
                ]
    })
    .then(dbPostData => {
        const post =dbPostData.get({plain: true});
        res.render('edit-posts', {post, loggedIn: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/newpost', (req, res) => {
    res.render('new-posts');
});

module.exports = router;