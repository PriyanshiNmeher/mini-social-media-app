import { useState } from 'react';
import { Box, TextField, Button, Paper, IconButton, Typography, Divider } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MenuIcon from '@mui/icons-material/Menu';
import CampaignIcon from '@mui/icons-material/Campaign';
import SendIcon from '@mui/icons-material/Send';
import api from '../api';

const CreatePost = ({ onPostCreated }) => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [fileName, setFileName] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content && !image) return;

        try {
            await api.post('/posts', { content, image });
            setContent('');
            setImage('');
            setFileName('');
            if (onPostCreated) onPostCreated();
        } catch (err) {
            console.error('Error creating post', err);
        }
    };

    return (
        <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">Create</Typography>
            </Box>

            <Paper elevation={0} sx={{ p: 2, borderRadius: '16px', border: '1px solid #f0f0f0' }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        placeholder="What's on your mind?"
                        multiline
                        rows={3}
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        fullWidth
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    {image && (
                        <Box sx={{ mt: 1, textAlign: 'center', position: 'relative' }}>
                            <img src={image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} />
                            <Button
                                size="small"
                                onClick={() => { setImage(''); setFileName(''); }}
                                sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'rgba(255,255,255,0.8)' }}
                            >
                                X
                            </Button>
                        </Box>
                    )}

                    <Divider light />

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton color="primary" component="label" size="small">
                                <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                                <PhotoCamera />
                            </IconButton>
                        </Box>

                        <Button
                            variant="contained"
                            type="submit"
                            endIcon={<SendIcon />}
                            disabled={!content && !image}
                            sx={{ borderRadius: '20px', textTransform: 'none', bgcolor: content || image ? '#9e9e9e' : '#e0e0e0', color: 'white', '&:hover': { bgcolor: '#757575' } }}
                        >
                            Post
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default CreatePost;
