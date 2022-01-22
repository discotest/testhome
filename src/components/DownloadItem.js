import React from 'react';
import PropTypes from 'prop-types';
import { useMediaPredicate } from 'react-media-hook';
import styled from 'styled-components';
import BackgroundImage from 'components/BackgroundImage';
import Button from 'components/Button';
import { MEDIUM_DEVICES_WIDTH } from 'utils/constants';
import { get } from 'lodash';

const DownloadBox = styled.div`
  height: 65px;
  background-color: #E9E9E9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  border-radius: 10px;
  margin-top: 15px;
  @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
    height: 45px;
  }
`;

const SongNameContainer = styled.div`
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: left;
  width: 30%;
  min-width: 85px;
  font-weight: 500;
  font-size: 22px;
  padding-left: 15px;
  .download-name {
    padding-left: 15px;
  }
  @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
    font-size: 13px;
    width: 70%;
    padding-left: 5px;
    .download-name {
      padding-left: 5px;
    }
  }
`;

const DownloadFieldContainer = styled.div`
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: left;
  width: 20%;
  min-width: 85px;
  font-weight: 500;
  font-size: 22px;
  @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
    display: none;
  }
`;

const DownloadButtonContainer = styled.div`
  height: inherit;
  display: flex;
  align-items: center;
  width: 20%;
  @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
    width: 110px;
  }
`;

const DownloadItem = ({ download }) => {
  const isLargeDevice = useMediaPredicate(`(min-width: ${MEDIUM_DEVICES_WIDTH}px)`);
  const rawSongName = get(download, 'songName', '');
  const songName = rawSongName.length > 13 ? `${rawSongName.substring(0, 13).trim()}...` : rawSongName;
  const rawArtist = get(download, 'artist', '');
  const artist = rawArtist.length > 13 ? `${rawArtist.substring(0, 13).trim()}...` : rawArtist;
  const downloadName = isLargeDevice ? songName : `${artist} - ${songName}`;
  const rawDownloadName = isLargeDevice ? rawSongName : `${rawArtist} - ${rawSongName}`;
  const rawGenre = get(download, 'genre', '');
  const genre = rawGenre.length > 13 ? `${rawGenre.substring(0, 13).trim()}...` : rawGenre;
  return (
    <DownloadBox>
      <SongNameContainer>
        <BackgroundImage
          src="https://www.science.org/do/10.1126/science.abf0868/abs/blackhole_1280p_0.jpg"
          width={isLargeDevice ? 50 : 35}
          height={isLargeDevice ? 50 : 35}
          borderRadius={10}
        />
        <span className="download-name" title={rawDownloadName}>{downloadName}</span>
      </SongNameContainer>
      <DownloadFieldContainer>
        <span title={rawArtist}>{artist}</span>
      </DownloadFieldContainer>
      <DownloadFieldContainer>
        <span title={rawGenre}>{genre}</span>
      </DownloadFieldContainer>
      <DownloadButtonContainer>
        <Button
          label="Download"
          color="black"
          width={isLargeDevice ? 150 : 90}
          height={isLargeDevice ? 50 : 35}
          borderRadius={isLargeDevice ? 15 : 8}
          fontSize={isLargeDevice ? 18 : 14}
          onClick={() => console.log('download click!')}
        />
      </DownloadButtonContainer>
    </DownloadBox>
  );
};

DownloadItem.propTypes = {
  download: PropTypes.object.isRequired,
};

export default DownloadItem;
