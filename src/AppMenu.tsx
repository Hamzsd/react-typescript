import React, {useCallback} from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import {useNavigate} from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsIcon from '@mui/icons-material/Settings';
import PublishIcon from '@mui/icons-material/Publish';

const AppMenu: React.FC = () => {
  const navigate = useNavigate();
  const home = useCallback(() => navigate('/', {replace: true}), [navigate]);
  const materials = useCallback(() => navigate('/materials', {replace: true}), [navigate]);
  const parameters = useCallback(() => navigate('/parameters', {replace: true}), [navigate]);
  const metaMaterials = useCallback(() => navigate('/metaMaterials', {replace: true}), [navigate]);

  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  function handleClick() {
    setOpen(!open)
  }

  return (
    <List component="nav" className={classes.appMenu} disablePadding>
      <ListItem button className={classes.menuItem}  onClick={home}>
        <ListItemIcon className={classes.menuItemIcon}>
          <HomeIcon/>
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>

      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <LoginIcon/>
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItem>

      <ListItem button onClick={handleClick} className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
        </ListItemIcon>
        <ListItemText primary="Assets" />
        {open ? <IconExpandLess /> : <IconExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider />
        <List component="div" disablePadding>
          <ListItem button className={classes.menuItem} onClick={materials}>
            <ListItemText inset primary="Material" />
          </ListItem>
          <ListItem button className={classes.menuItem} onClick={metaMaterials}>
            <ListItemText inset primary="MetaMaterial" />
          </ListItem>
          <ListItem button className={classes.menuItem} onClick={parameters}>
            <ListItemText inset primary="Parameters" />
          </ListItem>
        </List>
      </Collapse>
          
    </List>
  )
}

const drawerWidth = 240
const useStyles = makeStyles(theme =>
  createStyles({
    appMenu: {
      width: '100%',
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      color: '#fbf2f0',
    },
  }),
)

export default AppMenu
