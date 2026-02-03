const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Post = require('../models/Post');
const User = require('../models/User');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
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

// @route   GET api/posts
// @desc    Get all posts
// @access  Public (or Private? Requirement says public feed)
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/posts/:id/like
// @desc    Like a post
// @access  Private
router.put('/:id/like', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const user = await User.findById(req.user.id); // Get current user

        // Check if the post has already been liked by this user
        // Requirement: Save usernames of people who liked
        // Note: Using username for tracking creates a risk if username changes, but per requirement it's fine.
        // Better: store UserID, display Username.
        // But schema says `likes: [String]` (array of usernames).
        // Let's implement checking if username is in array.

        if (post.likes.includes(user.username)) {
            // Unlike? Requirement says "Like and Comment", usually implies toggle.
            // Let's implement toggle.
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

// @route   POST api/posts/:id/comment
// @desc    Comment on a post
// @access  Private
router.post('/:id/comment', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            username: user.username // save username as per requirement
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
