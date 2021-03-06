import Home from '../pages/Home'
import About from '../pages/About'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Register from '../pages/Register'

export default [
  {
    path: '/',
    component: Login
  },
  {
    path: '/page/about',
    component: About
  },
  {
    path: '/page/logout',
    component: Logout
  },
  {
    path: '/page/register',
    component: Register
  },
]
