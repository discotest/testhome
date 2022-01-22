import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {
} from 'react-router-dom';
import BackgroundImage from 'components/BackgroundImage';
import Album from 'components/Album';
import defaultProfilePic from 'assets/default_profile.png';
import { MEDIUM_DEVICES_WIDTH } from 'utils/constants';

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

const ReleasesContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
    margin-top: 0px;
  }
  color: ${(props) => (props.darkMode ? '#E4E4E4' : '#030303')};
`;

const ArtistHome = ({ darkMode }) => (
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
    <ReleasesContainer darkMode={darkMode}>
      <h1>Releases</h1>
      <Album darkMode={darkMode} src="https://e.snmc.io/i/600/s/25349381af4358e4d147523a1cb9e757/7912248/alok-bruno-martini-and-zeeba-hear-me-now-cover-art.jpg" />
      <Album darkMode={darkMode} src="https://e.snmc.io/i/600/s/25349381af4358e4d147523a1cb9e757/7912248/alok-bruno-martini-and-zeeba-hear-me-now-cover-art.jpg" />
      <Album darkMode={darkMode} src="https://e.snmc.io/i/600/s/25349381af4358e4d147523a1cb9e757/7912248/alok-bruno-martini-and-zeeba-hear-me-now-cover-art.jpg" />
      <Album darkMode={darkMode} src="https://e.snmc.io/i/600/s/25349381af4358e4d147523a1cb9e757/7912248/alok-bruno-martini-and-zeeba-hear-me-now-cover-art.jpg" />
      <Album darkMode={darkMode} src="https://e.snmc.io/i/600/s/25349381af4358e4d147523a1cb9e757/7912248/alok-bruno-martini-and-zeeba-hear-me-now-cover-art.jpg" />
      <Album darkMode={darkMode} src="https://e.snmc.io/i/600/s/25349381af4358e4d147523a1cb9e757/7912248/alok-bruno-martini-and-zeeba-hear-me-now-cover-art.jpg" />
      <Album darkMode={darkMode} src="https://e.snmc.io/i/600/s/25349381af4358e4d147523a1cb9e757/7912248/alok-bruno-martini-and-zeeba-hear-me-now-cover-art.jpg" />
      <Album darkMode={darkMode} src="https://e.snmc.io/i/600/s/25349381af4358e4d147523a1cb9e757/7912248/alok-bruno-martini-and-zeeba-hear-me-now-cover-art.jpg" />
    </ReleasesContainer>
  </MainContainer>
);

ArtistHome.propTypes = {
  darkMode: PropTypes.bool,
};

ArtistHome.defaultProps = {
  darkMode: false,
};

export default ArtistHome;
