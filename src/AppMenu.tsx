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

const AppMenu: React.FC = () => {
  const navigate = useNavigate();
  const home = useCallback(() => navigate('/', {replace: true}), [navigate]);
  const materials = useCallback(() => navigate('/materials', {replace: true}), [navigate]);
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
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>

      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItem>

      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
        </ListItemIcon>
        <ListItemText primary="Admin" />
      </ListItem>

      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>

      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
        </ListItemIcon>
        <ListItemText primary="Import" />
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
        </List>
      </Collapse>

      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItem>
          
      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
        </ListItemIcon>
        <ListItemText primary="Export" />
      </ListItem>


      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
        </ListItemIcon>
        <ListItemText primary="Support" />
      </ListItem>
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
      color: '#97c05c',
    },
  }),
)

export default AppMenu
