import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Album from 'components/Album';
import { MEDIUM_DEVICES_WIDTH } from 'utils/constants';

const ReleasesContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
    margin-top: 0px;
  }
  color: ${(props) => (props.darkMode ? '#E4E4E4' : '#030303')};
`;

const Releases = ({ darkMode }) => (
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
);

Releases.propTypes = {
  darkMode: PropTypes.bool,
};

Releases.defaultProps = {
  darkMode: false,
};

export default Releases;
