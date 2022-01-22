import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { MEDIUM_DEVICES_WIDTH } from 'utils/constants';
import NavbarLogo from 'assets/navbar_logo.png';
import NavbarLogoDark from 'assets/navbar_logo_dark.png';
import { ReactComponent as BurguerMenu } from 'assets/burguer_menu.svg';
import { ReactComponent as BurguerMenuDark } from 'assets/burguer_menu_dark.svg';
import BackgroundImage from './BackgroundImage';

const NavbarContainer = styled.div`
  height: 75px;
  background-color: ${(props) => (props.darkMode ? '#272727' : '#E4E4E4')};
  @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
    height: 50px;
  }
`;

const NavbarWrapper = styled.div`
  margin: auto;
  width: 80%;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
    width: 90%;
  }
  .large-devices-logo {
    @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
      display: none;
    }
  }
  .small-devices-logo {
    @media (min-width: ${MEDIUM_DEVICES_WIDTH + 1}px) {
      display: none;
    }
  }
`;

const BurguerMenuWrapper = styled.div`
  @media (min-width: ${MEDIUM_DEVICES_WIDTH + 1}px) {
    display: none;
  }
`;

const NavItemsContainer = styled.div`
  @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
    display: none;
  }
  width: 325px;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 800;
  .nav-item {
    cursor: pointer;
    color: ${(props) => (props.darkMode ? '#E4E4E4' : '#030303')};
  }
  .nav-item.nav-dropdown {
    width: 140px;
    position: relative;
    color: #FF4D00;
    &:after {
      content: ""; 
      width: 0;
      height: 0;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 8px solid ${(props) => (props.darkMode ? '#E4E4E4' : '#030303')};
      position: relative;
      top: 17px;
      left: 5px;
    }
  }
`;

const NavDropdown = styled.div`
  position: absolute;
  width: 200px;
  background-color: ${(props) => (props.darkMode ? '#272727' : '#E4E4E4')};
  top: 45px;
  left: -30px;
  color: ${(props) => (props.darkMode ? '#E4E4E4' : '#030303')};
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const NavDropdownOption = styled.div`
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Navbar = ({ darkMode, username }) => {
  const [isDropdownVisible, toggleDropdown] = useState(false);
  const myRef = useRef();

  const handleClickOutside = (e) => {
    if (!myRef?.current?.contains(e.target)) {
      toggleDropdown(false);
    }
  };

  const handleClickInside = () => toggleDropdown(!isDropdownVisible);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <NavbarContainer darkMode={darkMode}>
      <NavbarWrapper>
        <BackgroundImage
          src={darkMode ? NavbarLogoDark : NavbarLogo}
          width={168}
          height={45}
          className="large-devices-logo"
        />
        <BackgroundImage
          src={darkMode ? NavbarLogoDark : NavbarLogo}
          width={86}
          height={23}
          className="small-devices-logo"
        />
        <BurguerMenuWrapper>
          {darkMode ? <BurguerMenuDark /> : <BurguerMenu />}
        </BurguerMenuWrapper>
        <NavItemsContainer darkMode={darkMode}>
          <div className="nav-item">
            FAQ
          </div>
          <div className="nav-item">
            Feedback
          </div>
          {username ? (
            <div className="nav-item nav-dropdown" ref={myRef} onClick={handleClickInside}>
              {username}
              {isDropdownVisible
            && (
              <NavDropdown darkMode={darkMode}>
                <NavDropdownOption>
                  My profile
                </NavDropdownOption>
                <NavDropdownOption>
                  Sign out
                </NavDropdownOption>
              </NavDropdown>
            )}
            </div>
          ) : (
            <div className="nav-item">
              Register
            </div>
          )}
        </NavItemsContainer>
      </NavbarWrapper>
    </NavbarContainer>
  );
};

Navbar.propTypes = {
  darkMode: PropTypes.bool,
  username: PropTypes.string,
};

Navbar.defaultProps = {
  darkMode: false,
  username: '',
};

const mapStateToProps = (state) => ({
  username: state.authenticationReducer.username,
});

export default connect(mapStateToProps, null)(Navbar);
