import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import { Link, withRouter } from 'react-router-dom'

const isActive = (history, path) => {
  if (history.location.pathname == path)
    return { color: '#bef67a' }
  else
    return { color: '#ffffff' }
}
const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path))
    return { color: '#bef67a' }
  else
    return { color: '#ffffff' }
}
// const buttonCSS = {
//   align
// }
const Menu = withRouter(({ history }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        SneakOut
      </Typography>
      <div>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, "/")}>
            <HomeIcon />
          </IconButton>
        </Link>
      </div>
      <div style={{ 'position': 'absolute', 'right': '10px' }}><span style={{ 'float': 'right' }}>
        {
          !auth.isAuthenticated() && (<span>
            <Link to="/signup">
              <Button style={isActive(history, "/signup")}>Sign up
              </Button>
            </Link>
            <Link to="/signin">
              <Button style={isActive(history, "/signin")}>Sign In
              </Button>
            </Link>
          </span>)
        }
        {
          auth.isAuthenticated() && (<span>
            {auth.isAuthenticated().user.seller &&
              (<Link to="/seller/shops"><Button style={isPartActive(history, "/seller/")}>My Shops</Button></Link>)}
            <div style={{ 'float': 'left' }}><span style={{ 'float': 'right' }}>
              <Link to="/featureditems">
                <Button style={isActive(history, "/user/")}> View</Button>
              </Link>
              <Link to="/createitems">
                <Button style={isActive(history, "/user/")}> Add</Button>
              </Link>
              <Link to="edititems">
                <Button style={isActive(history, "/user/")}> Update</Button>
              </Link>
              <Link to="removeitems">
                <Button style={isActive(history, "/user/")}> Remove</Button>
              </Link>
              <Link to={"/user/" + auth.isAuthenticated().user._id}>
                <Button style={isActive(history, "/user/")}>My Profile</Button>
              </Link>
              </span>
            </div>
            <Button color="inherit" onClick={() => {
              auth.clearJWT(() => history.push('/'))
            }}>Sign out</Button>
          </span>)
        }
      </span></div>
    </Toolbar>
  </AppBar>
))

export default Menu
