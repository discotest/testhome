import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import artistDownloadsSelector from 'state/artistDownloads/selectors';
import DownloadItem from 'components/DownloadItem';

const DownloadsContainer = styled.div`
  margin-top: 40px;
`;

const Downloads = ({ downloads }) => (
  <DownloadsContainer>
    <h1>Downloads</h1>
    {downloads.map((item) => (
      <DownloadItem key={`download-item-${item.songName}`} download={item} />
    ))}
  </DownloadsContainer>
);

const mapStateToProps = (state) => ({
  downloads: artistDownloadsSelector.downloads(state),
});

Downloads.propTypes = {
  downloads: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, null)(Downloads);
