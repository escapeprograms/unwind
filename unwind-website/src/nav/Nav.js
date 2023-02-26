import "./Nav.css"
import { NavLink, useLocation } from 'react-router-dom';

const Nav = props => {
  const activeClass = ({isActive}) => {
    return isActive ? "activeNav" : undefined
  }
  return (
    <nav className={useLocation().pathname === "/" ? "home" : ""}id="nav">
      <ul>
        <li>
          <NavLink className={activeClass} to="/">Home</NavLink>
        </li>
        <li>
          <NavLink className={activeClass} to="/demo">Demo</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav;