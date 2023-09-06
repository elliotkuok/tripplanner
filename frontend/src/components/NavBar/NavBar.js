import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from '../SessionForms/LoginForm';
import SignupForm from '../SessionForms/SignupForm';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';

function NavBar () {
  const location = useLocation();
  const loggedIn = useSelector(state => !!state.session.user);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    console.log("showLoginModal changed to", showLoginModal);
  }, [showLoginModal]);

  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <button 
            style={{ background: "#457B9D" }} 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {user.username}
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              <Link to={`/users/${user._id}`}>User Profile</Link>
              <a onClick={logoutUser}>Logout</a>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <>
          <div className="links-auth">
            <button id="login" onClick={() => setShowLoginModal(true)}>Login</button>
            <button id="signup" onClick={() => setShowSignupModal(true)}>Sign up</button>
          </div>

          {/* Modals */}
          <Modal open={showLoginModal} onClose={() => setShowLoginModal(false)}>
            <LoginForm />
          </Modal>
          <Modal open={showSignupModal} onClose={() => setShowSignupModal(false)}>
            <SignupForm />
          </Modal>
        </>
      );
    }
  }

  return (
      <div className={`nav-bar-container`}>
        <div className="logo-button">
          <Link to="/">
            <h2>TripPlanner</h2>
          </Link>
        </div>
        { getLinks() }
      </div> 
  );
}

export default NavBar;