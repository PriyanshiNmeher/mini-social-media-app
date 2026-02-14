const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Post = require('../models/Post');
const User = require('../models/User');

router.post('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            content: req.body.content,
            image: req.body.image,
            username: user.username,
            userId: req.user.id
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/:id/like', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const user = await User.findById(req.user.id);


        if (post.likes.includes(user.username)) {
            const removeIndex = post.likes.indexOf(user.username);
            post.likes.splice(removeIndex, 1);
        } else {
            post.likes.unshift(user.username);
        }

        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.post('/:id/comment', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            username: user.username
        };

        post.comments.unshift(newComment);

        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
