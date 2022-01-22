import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import BackgroundImage from 'components/BackgroundImage';
import FeatureButton from 'components/FeatureButton';
import defaultProfilePic from 'assets/default_profile.png';
import { MEDIUM_DEVICES_WIDTH } from 'utils/constants';
import Releases from './Releases';
import Analytics from './Analytics';
import Upload from './Upload';
import Downloads from './Downloads';

const MainContainer = styled.div`
  width: 1000px;
  margin: auto;
  max-width: 90%;
  @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
    width: 85%;
  }
  margin-bottom: 50px;
`;

const ArtistInfoContainer = styled.div`
  height: 180px;
  display: flex;
  align-items: center;
  margin-top: 70px;
  @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
    margin-top: 0px;
  }
`;

const ProfileContainer = styled.div`
  height: inherit;
  display: flex;
  align-items: center;
  .profile-pic-large-devices {
    @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
      display: none;
    }
  }
  .profile-pic-small-devices {
    @media (min-width: ${MEDIUM_DEVICES_WIDTH + 1}px) {
      display: none;
    }
  }
`;

const UsernameContainer = styled.div`
  margin-left: 25px;
  height: 110px;
  @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
    margin-left: 15px;
  }
  .title-username {
    font-size: 40px;
    font-weight: 800;
    color: ${(props) => (props.darkMode ? '#E4E4E4' : '#030303')};
    @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
      font-size: 25px;
      margin-top: 15px;
    }
  }
  .username {
    color: #FF4D00;
    font-size: 24px;
    font-weight: 600;
    @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
      font-size: 15px;
    }
  }
`;

const FeaturesContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
  @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
    margin-top: 0px;
  }
`;

const ArtistHome = ({ darkMode }) => {
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <MainContainer>
      <ArtistInfoContainer>
        <ProfileContainer>
          <div className="profile-pic-large-devices">
            <BackgroundImage src={defaultProfilePic} width={165} height={165} />
          </div>
          <div className="profile-pic-small-devices">
            <BackgroundImage src={defaultProfilePic} width={80} height={80} />
          </div>
          <UsernameContainer darkMode={darkMode}>
            <div className="title-username">
              BabyCommando
            </div>
            <div className="username">
              @babycommando
            </div>
          </UsernameContainer>
        </ProfileContainer>
      </ArtistInfoContainer>
      <FeaturesContainer>
        <FeatureButton feature="releases" isActive={pathName === '/'} />
        <FeatureButton feature="analytics" isActive={pathName === '/analytics'} />
        <FeatureButton feature="upload" isActive={pathName === '/upload'} />
        <FeatureButton feature="downloads" isActive={pathName === '/downloads'} />
      </FeaturesContainer>
      <Switch>
        <Route exact path="/" component={Releases} />
        <Route exact path="/analytics" component={Analytics} />
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/downloads" component={Downloads} />
      </Switch>
    </MainContainer>
  );
};

ArtistHome.propTypes = {
  darkMode: PropTypes.bool,
};

ArtistHome.defaultProps = {
  darkMode: false,
};

export default ArtistHome;
