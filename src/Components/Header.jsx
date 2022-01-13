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

        <li>
          <NavLink activeClassName="active" to="/Auctions">
            Auctions
          </NavLink>
        </li>

        {/* {facade.hasUserAccess('owner', loggedIn) && (
          <li>
            <NavLink activeClassName="active" to="/Auctions">
              Auctions
            </NavLink>
          </li>
        )} */}
      </ul>
    </div>
  );
}

export default Header;