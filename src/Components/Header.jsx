import { NavLink } from 'react-router-dom';
function Header({ facade, loggedIn }) {

  return (
    <div>
      <ul className='header'>
        <li>
          <NavLink exact activeClassName='active' to='/'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to='/US_1'>
            Auctions
          </NavLink>
        </li>
        {facade.hasUserAccess('owner', loggedIn) && (
          <li>
            <NavLink activeClassName='active' to='/US_2'>
              Boats
            </NavLink>
          </li>
        )}
        {facade.hasUserAccess('owner', loggedIn) && (
          <li>
            <NavLink activeClassName='active' to='/US_3'>
              Add Boat
            </NavLink>
          </li>
        )}
        {facade.hasUserAccess('owner', loggedIn) && (
          <li>
            <NavLink activeClassName='active' to='/US_4'>
              Update Boat
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header;