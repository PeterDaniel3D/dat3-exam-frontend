import { NavLink } from 'react-router-dom';
function Header({ facade, loggedIn }) {

  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        {facade.hasUserAccess('owner', loggedIn) && (
          <li>
            <NavLink activeClassName="active" to="/Placeholder">
              Placeholder
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header;