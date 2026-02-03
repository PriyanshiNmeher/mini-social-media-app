import { useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Collapse, TextField, Button, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const Post = ({ post }) => {
    const { user } = useAuth();
    const [likes, setLikes] = useState(post.likes);
    const [comments, setComments] = useState(post.comments);
    const [commentText, setCommentText] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(post.likes.includes(user?.username));

    const handleLike = async () => {
        try {
            const res = await api.put(`/posts/${post._id}/like`);
            setLikes(res.data);
            setLiked(res.data.includes(user.username));
        } catch (err) {
            console.error('Error liking post', err);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        try {
            const res = await api.post(`/posts/${post._id}/comment`, { text: commentText });
            setComments(res.data);
            setCommentText('');
        } catch (err) {
            console.error('Error commenting', err);
        }
    };

    return (
        <Card sx={{ mb: 2, borderRadius: '16px', boxShadow: 'none', border: '1px solid #f0f0f0' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: '#1976d2' }} aria-label="user">
                        {post.username.charAt(0).toUpperCase()}
                    </Avatar>
                }
                action={
                    null
                }
                title={
                    <Typography variant="subtitle1" fontWeight="bold">
                        {post.username} <span style={{ color: '#757575', fontWeight: 'normal', fontSize: '0.9rem' }}>... @{post.username}</span>
                    </Typography>
                }
                subheader={
                    <Typography variant="caption" color="text.secondary">
                        {new Date(post.createdAt).toLocaleString()}
                    </Typography>
                }
            />

            <CardContent sx={{ py: 1 }}>
                <Typography variant="body1" color="text.primary">
                    {post.content}
                </Typography>
            </CardContent>

            {post.image && (
                <CardMedia
                    component="img"
                    image={post.image}
                    alt="Post image"
                    sx={{ maxHeight: 500, objectFit: 'contain', bgcolor: '#f8f9fa' }}
                />
            )}

            <CardActions disableSpacing sx={{ px: 2, pt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                    <IconButton aria-label="add to favorites" onClick={handleLike} size="small" color={liked ? 'error' : 'default'}>
                        {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                        {likes.length}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                    <IconButton aria-label="comment" size="small" onClick={() => setExpanded(!expanded)}>
                        <CommentIcon />
                    </IconButton>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                        {comments.length}
                    </Typography>
                </Box>


            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Box component="form" onSubmit={handleCommentSubmit} sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <TextField
                            size="small"
                            fullWidth
                            placeholder="Add a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            sx={{ bgcolor: '#f0f2f5', '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, borderRadius: 1 }}
                        />
                        <Button type="submit" variant="contained" size="small" sx={{ borderRadius: '20px' }}>Post</Button>
                    </Box>
                    <List disablePadding>
                        {comments.map((comment, index) => (
                            <ListItem key={index} alignItems="flex-start" sx={{ px: 0 }}>
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle2" component="span" fontWeight="bold">
                                            {comment.username}
                                        </Typography>
                                    }
                                    secondary={comment.text}
                                />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default Post;
