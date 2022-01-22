import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { MEDIUM_DEVICES_WIDTH } from 'utils/constants';
import BackgroundImage from './BackgroundImage';

const Container = styled.div`
  width: 225px;
  height: 285px;
  display: inline-block;
  .album-name: {
    margin-top: 25px;
  }
  @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
    width: 100px;
    height: 140px;
  }
  .large-devices {
    @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
      display: none;
    }
  }
  .small-devices {
    @media (min-width: ${MEDIUM_DEVICES_WIDTH + 1}px) {
      display: none;
    }
  }
`;

const AlbumInfoContainer = styled.div`
  margin-top: 10px;
  font-weight: 600;
  .artist-name {
    margin-top: 5px;
  }
  @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
    margin-top: 0px;
    font-size: 11px;
  }
`;

const Album = ({
  src, albumName, artistName, darkMode,
}) => (
  <Container>
    <div className="large-devices">
      <BackgroundImage src={src} width={200} height={200} borderRadius={15} />
    </div>
    <div className="small-devices">
      <BackgroundImage src={src} width={90} height={90} borderRadius={15} />
    </div>
    <AlbumInfoContainer darkMode={darkMode}>
      <div className="album-name">
        <span>{albumName}</span>
      </div>
      <div className="artist-name">
        <span>{artistName}</span>
      </div>
    </AlbumInfoContainer>
  </Container>
);

Album.propTypes = {
  src: PropTypes.string.isRequired,
  albumName: PropTypes.string,
  artistName: PropTypes.string,
  darkMode: PropTypes.bool,
};

Album.defaultProps = {
  albumName: 'Album Name',
  artistName: 'Artist',
  darkMode: false,
};

export default Album;
