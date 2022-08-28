import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'

//material ui
import { AppBar, Box, Toolbar, Typography, Button, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const Navbar = (props) => {

    const navigate = useNavigate()

    const [searchQuery, setSearchQuery] = useState('')

    const onSubmitSearch = (e) => {
        e.preventDefault()
        if (searchQuery != '' && searchQuery != null) {
            navigate(`/search?q=${searchQuery}`)
        }
    }

    return (
        <Box>
            <AppBar component="nav">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        MLX
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            height: '40px',
                            width: { xs: '100%', sm: '200px' },
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '4px',
                            backgroundColor: 'rgba(255,255,255,0.15)',
                            color: 'white'
                        }}
                        onSubmit={onSubmitSearch}
                    >
                        <Box
                            sx={{
                                height: '100%',
                                width: '40px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <SearchIcon />
                        </Box>
                        <input
                            style={{
                                height: '100%',
                                width: 'calc(100% - 40px)',
                                fontSize: '16px', 
                                color: '#fff',
                                backgroundColor: 'transparent',
                                border: 'none',
                                outline: 'none',
                            }}
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                            }}
                            placeholder="Search"
                        />
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button sx={{ color: '#fff' }}>
                            <NavLink style={{ color: 'inherit', width: '100%' }} to="/">Home</NavLink>
                        </Button>
                        <Button sx={{ color: '#fff' }}>
                            <NavLink style={{ color: 'inherit', width: '100%' }} to="/myads">My Ads</NavLink>
                        </Button>
                        <Button sx={{ color: '#fff' }}>
                            <NavLink style={{ color: 'inherit', width: '100%' }} to="/post-ad">Post Ad</NavLink>
                        </Button>
                        <Button sx={{ color: '#fff' }}>
                            <NavLink style={{ color: 'inherit', width: '100%' }} to="/account">Account</NavLink>
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
