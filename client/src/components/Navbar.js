import React, {useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import PublishIcon from '@material-ui/icons/Publish';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import MovieIcon from '@material-ui/icons/Movie';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AuthHandler from './Auth';
import {
    Link,
    Redirect,
  } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  button: {
    margin: theme.spacing(0.7)
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color:'inherit',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 1.0),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.7),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '200px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(15),
      width: '500px'
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [myOptions, setMyOptions] = useState([])
  const [search, setSearch] = useState('')
  const [opened,setOpened] = useState(false)

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const getDataFromAPI = () => {
    setMyOptions(['first','second','third'])
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(e.target.value)
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} to="/profile">Profile</MenuItem>
      <MenuItem component={Link} to="/logout" onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
    { AuthHandler.isLoggedIn()
      ?
      <span>
        <MenuItem component={Link} to="/login">
          <Button 
            component={Link} to="/upload"
            className={classes.button}
            color="inherit"
            
            >
              <PublishIcon/>
              Upload
          </Button>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </span>
      :
      <span>
        <MenuItem component={Link} to="/login">
          <IconButton aria-label="login" color="inherit">
              <ExitToAppIcon />
          </IconButton>
          <p>Login</p>
        </MenuItem>
        <MenuItem component={Link} to="/signup">
          <IconButton aria-label="signup" color="inherit">
              <PersonAddIcon />
          </IconButton>
          <p>SignUp</p>
        </MenuItem>
      </span>
      }
    </Menu>
  );
  const menuItems = [
    { 
      text: 'Home', 
      icon: <HomeIcon />, 
      to: '/' 
    },
    AuthHandler.isLoggedIn()
      ?
    { 
      text: 'Subscription', 
      icon: <ExploreIcon />, 
      to: '/Subscription/' 
    }
    :''
];
  const cateogry=[ { 
        text: 'Music', 
        icon: <MusicNoteIcon />,
        to: '/category/Music'
    },
    { 
        text: 'Gaming', 
        icon: <SportsEsportsIcon />, 
        to: '/category/Gaming'
    },
    { 
        text: 'Sport', 
        icon: <SportsEsportsIcon />, 
        to: '/category/Sport'
    },
    { 
        text: 'Autos & Vehicles', 
        icon: <MovieIcon />, 
        to: '/category/Autos & Vehicles'
    },
    { 
        text: 'Film & Animation', 
        icon: <MovieIcon />, 
        to: '/category/Film & Animation' 
    }
]

  return (
    <div className={classes.grow}>
      <CssBaseline />
      <Drawer 
        open={opened}
        onClose={()=> setOpened(false)}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        >
        <Toolbar />
        <div>
          <List>
              {menuItems.map((item) => (
                  <ListItem 
                  button 
                  key={item.text} 
                  component={Link} to={item.to}
                  >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  </ListItem>
              ))}
          </List>
          <Divider />
          <List>
              {cateogry.map((item) => (
                  <ListItem 
                  button 
                  key={item.text} 
                  component={Link} to={item.to}
                  >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  </ListItem>
              ))}
          </List>
        </div>
      </Drawer>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={()=>setOpened(true)}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Button 
            component={Link} to="/"
            className={classes.title}
          >
            Youtube
          </Button>
          <form autoComplete="off">
            <Autocomplete
                className={classes.search}
                freeSolo
                autoComplete
                autoHighlight
                on
                onChange={handleSubmit}
                options={myOptions}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search..."
                        autoComplete='off'
                        onChange={getDataFromAPI}
                        InputProps={{ ...params.InputProps, type: 'search', 'aria-label': 'search' }}
                    />
                )}
            />
            
          </form>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          { AuthHandler.isLoggedIn()
            ? 
            <span>
              <Button 
              component={Link} to="/upload"
              className={classes.button}
              color="inherit"
              variant="outlined"
              >
                <PublishIcon/>
                Upload
              </Button>
              <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              >
                <AccountCircle fontSize="large"/>
              </IconButton>
            </span>
            :
            <span>
              <Button 
              component={Link} to="/login"
              className={classes.button}
              color="inherit"
              variant="outlined"
              >
                <ExitToAppIcon/>
                Login
              </Button>
              <Button 
              component={Link} to="/signup"
              className={classes.button}
              color="inherit"
              variant="outlined"
              >
                <PersonAddIcon/>
                SignUp
              </Button>
            </span>
          }
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
