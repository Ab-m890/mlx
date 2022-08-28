import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//material ui
import { Paper, BottomNavigation, BottomNavigationAction , Box} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import AddIcon from '@mui/icons-material/Add'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PersonIcon from '@mui/icons-material/Person'
const BottomNavbar = () => {
    const navigate = useNavigate()
    const [value, setValue] = useState(0)

    return (
        <Box sx={{ display: { sm: 'none' } }}>
            <Paper sx={{ position: 'fixed' , bottom: 0 , left: 0 , right: 0 }} eleveation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue)
                    }}
                >
                    <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={() => navigate('/')} />
                    <BottomNavigationAction label="New" icon={<AddIcon />} onClick={() => navigate('/post-ad')} />
                    <BottomNavigationAction label="My Ads" icon={<FavoriteIcon />} onClick={() => navigate('/myads')} />
                    <BottomNavigationAction label="Account" icon={<PersonIcon />} onClick={() => navigate('/account')} />
                </BottomNavigation>
            </Paper>
        </Box>
    )
}

export default BottomNavbar