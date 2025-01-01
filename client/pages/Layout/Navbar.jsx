import React from 'react'
import { toast } from 'react-toastify';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import BookIcon from '@mui/icons-material/Book';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { logout, check_token } from '../Auth/authslice';
import { useEffect } from 'react';

const pages = ['Home', 'Todolist'];
const settings = ['Dashboard', 'Update Password', 'Logout'];

const Navbar = () => {

    const route = useRouter();
    const dispatch = useDispatch();
    const { Logouttoggle } = useSelector((state) => state?.Auth);
    //const name = localStorage.getItem("name");

    const handleLogout = () => {
        dispatch(logout())
        route.push("/login")
    }

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // This step is required for to stop page refreshing problem in logout button
    useEffect(() => {
        dispatch(check_token())
    }, [])

    return (
        <>
            {/*Navbar Start*/}
            <AppBar position="fixed" sx={{ background: '#1bbd36' }}>

                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <BookIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: '50px' }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Home
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Link href={page === 'Home' ? '/' : `/${page.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Home
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    component={Link}
                                    href={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {Logouttoggle ? (
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar src="https://cdn-icons-png.flaticon.com/128/219/219970.png" alt={name} />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
                                                {setting === 'Profile' ? (
                                                    <Typography textAlign="center">Profile: {name}</Typography>
                                                ) : setting === 'Update Password' ? (
                                                    <Typography textAlign="center">
                                                        <Link href="/update">Update Password</Link>
                                                    </Typography>
                                                ) : (
                                                    <Typography textAlign="center">
                                                        {setting}
                                                    </Typography>
                                                )}
                                            </MenuItem>
                                        ))}

                                    </Menu>
                                </>
                            ) : (
                                <Button component={Link} href="/login" sx={{ color: 'inherit', textDecoration: 'none' }}>
                                    Login
                                </Button>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {/*Navbar End*/}
        </>
    )
}

export default Navbar