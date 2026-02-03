import { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import Navbar from '../components/Navbar';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import BottomNav from '../components/BottomNav';
import api from '../api';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchPosts = async () => {
        try {
            const res = await api.get('/posts');
            setPosts(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching posts', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const filteredPosts = posts.filter(post =>
        (post.content && post.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (post.username && post.username.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <Box sx={{ pb: 7 }}>
            <Navbar onSearch={setSearchQuery} />
            <Container maxWidth="sm" sx={{ mt: 2, pb: 4 }}>
                <CreatePost onPostCreated={fetchPosts} />

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box>
                        {filteredPosts.map(post => (
                            <Post key={post._id} post={post} />
                        ))}
                        {filteredPosts.length === 0 && (
                            <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
                                {posts.length === 0 ? "No posts yet. Be the first to post!" : "No posts match your search."}
                            </Typography>
                        )}
                    </Box>
                )}
            </Container>
            <BottomNav />
        </Box>
    );
};

export default Feed;
