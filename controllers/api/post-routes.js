const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// get all of the posts
router.get('/', (req, res) => {
    console.log('--------');
    Post.findAll({
        //     attributes: ['id',
        //                 'post_text',
        //                 'title',
        //                 'created_at'
        // ],
        // most recent first
        order: [['created_at', 'DESC']],
// 
        include: [
            {
                model: Comment,
                // attributes: ['id','comment_text','post_id','user_id','created_at'],
                include: {
                    model: User,
                    // attributes: ['username']
                }
            },
            {
                model: User,
                // attributes: ['username']
            },
        ]
// 
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
// // single post by id

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        // attributes: ['id',
        //             'post-text',
        //             'title',
        //             'created_at' 
        // ],
        include: [
            {
                model: User,
                // attributes: ['username']
            },
            {
                model: Comment,
                // attributes: ['id', 'comment_text','post_id','user_id','created_at'],
                include: {
                    model: User,
                    // attributes: ['username']
                }
            }
        ]

    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
// create a new post
router.post('/', (req, res) => {
    console.log('-------------------------', req);
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// update a post
router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        post_text: req.params.id
    },
        {
            where: {
                id: req.params.id
            }
        }).then(dbPostData => {
            if (!dbPostData) {
                res.status(400).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);

        });
});
// deleting a post
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;


