import { Paper, BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LanguageIcon from '@mui/icons-material/Language'; 
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useState } from 'react';
import { styled } from '@mui/material/styles';

const CustomBottomNavigationAction = styled(BottomNavigationAction)(({ theme }) => ({
    color: '#9e9e9e',
    '&.Mui-selected': {
        color: '#1976d2',
    },
}));

const BottomNav = () => {
    const [value, setValue] = useState(2);

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000, borderTop: '1px solid #e0e0e0' }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                   
                }}
            >
                <CustomBottomNavigationAction label="Home" icon={<HomeIcon />} />
                <CustomBottomNavigationAction label="Task" icon={<AssignmentIcon />} />

                <CustomBottomNavigationAction
                    label="Socia"
                    icon={
                        <Box sx={{
                            bgcolor: '#e3dfde',
                            p: 0.5,
                            borderRadius: '50%',
                            mt: -2, 
                            border: '4px solid white',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Box sx={{ bgcolor: '#1976d2', borderRadius: '50%', p: 1 }}>
                                <LanguageIcon sx={{ color: 'white' }} />
                            </Box>
                        </Box>
                    }
                    sx={{
                        '& .MuiBottomNavigationAction-label': { fontWeight: 'bold', color: '#1976d2' }
                    }}
                />

                <CustomBottomNavigationAction label="Leaderboard" icon={<EmojiEventsIcon />} />
            </BottomNavigation>
        </Paper>
    );
};

export default BottomNav;
