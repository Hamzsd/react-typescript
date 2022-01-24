import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Container from '@material-ui/core/Container'
import AppMenu from './AppMenu'
import {Route,Routes} from "react-router-dom"
import {Home,Materials,MetaMaterials} from './components/pages'

const App: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={clsx('App', classes.root)}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <AppMenu />
      </Drawer>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
         <div>
           <h1>IG Creator</h1>
           <Routes>
            <Route path ="/" element={<Home/>}></Route>
            <Route path="/materials" element={<Materials/>}/>
            <Route path="/metaMaterials" element={<MetaMaterials/>}/>
           </Routes>
         </div>
        </Container>
      </main>
    </div>
  )
}

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    background: '#535454',
    color: '#fff',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))

export default App
