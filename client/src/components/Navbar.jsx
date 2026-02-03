import { AppBar, Toolbar, Typography, Box, IconButton, InputBase, Badge, Avatar, Button } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import StarIcon from '@mui/icons-material/Star';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '20px',
    backgroundColor: '#f0f2f5',
    '&:hover': {
        backgroundColor: '#e4e6e9',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#65676b',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Navbar = ({ onSearch }) => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box sx={{ flexGrow: 1, mb: 2 }}>
            <AppBar position="static" color="transparent" elevation={0} sx={{ bgcolor: 'white', pt: 1, pb: 1 }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {/* Left: Logo */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ fontWeight: 'bold', color: 'black' }}
                    >
                        Socia
                    </Typography>

                    {/* Right: Profile */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Button
                            onClick={handleLogout}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textTransform: 'none',
                                padding: 1,
                                minWidth: 'auto'
                            }}
                        >
                            <Avatar
                                alt={user?.username}
                                src="/static/images/avatar/2.jpg"
                                sx={{ bgcolor: '#1976d2', mb: 0.5, width: 32, height: 32 }}
                            >
                                {user?.username?.charAt(0).toUpperCase()}
                            </Avatar>
                            <Typography variant="caption" sx={{ color: 'black', lineHeight: 1 }}>
                                {user?.username}
                            </Typography>
                        </Button>
                    </Box>
                </Toolbar>

                {/* Search Row */}
                <Box sx={{ px: 2, pb: 1, display: 'flex', alignItems: 'center' }}>
                    <Search sx={{ flexGrow: 1, ml: 0, mr: 1 }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search promotions, users, posts..."
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => onSearch && onSearch(e.target.value)}
                        />
                    </Search>
                    <Box sx={{ bgcolor: '#1976d2', borderRadius: '50%', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <SearchIcon sx={{ color: 'white' }} />
                    </Box>
                </Box>
            </AppBar>
        </Box>
    );
};

export default Navbar;
