import { get, startCase } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import IconReleasesSelected from 'assets/icon_releases_selected.png';
import IconReleasesUnselected from 'assets/icon_releases_unselected.png';
import IconAnalyticsSelected from 'assets/icon_analytics_selected.png';
import IconAnalyticsUnselected from 'assets/icon_analytics_unselected.png';
import IconUploadSelected from 'assets/icon_upload_selected.png';
import IconUploadUnselected from 'assets/icon_upload_unselected.png';
import IconDownloadsSelected from 'assets/icon_downloads_selected.png';
import IconDownloadsUnSelected from 'assets/icon_downloads_unselected.png';
import { MEDIUM_DEVICES_WIDTH } from 'utils/constants';
import BackgroundImage from './BackgroundImage';

const iconDictionary = {
  releases_active: IconReleasesSelected,
  releases_not_active: IconReleasesUnselected,
  analytics_active: IconAnalyticsSelected,
  analytics_not_active: IconAnalyticsUnselected,
  upload_active: IconUploadSelected,
  upload_not_active: IconUploadUnselected,
  downloads_active: IconDownloadsSelected,
  downloads_not_active: IconDownloadsUnSelected,
};

const Container = styled.div`
  width: 100px;
  height: 120px;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-weight: 500;
  span {
    padding-top: 5px;
  }
`;

const IconWrapper = styled.div`
  width: 85px;
  height: 85px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? '#272727' : '#E4E4E4')};
  @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
    width: 70px;
    height: 70px;
  }
  .large-devices-btn {
    @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
      display: none;
    }
  }
  .small-devices-btn {
    @media (min-width: ${MEDIUM_DEVICES_WIDTH + 1}px) {
      display: none;
    }
  }
`;

const FeatureButton = ({
  darkMode, isActive, feature,
}) => (
  <Container darkMode={darkMode}>
    <Link to={`/${feature === 'releases' ? '' : feature}`}>
      <IconWrapper isActive={isActive}>
        <div className="large-devices-btn">
          <BackgroundImage
            src={get(iconDictionary, `${feature}_${isActive ? 'active' : 'not_active'}`) || IconReleasesSelected}
            width={65}
            height={65}
          />
        </div>
        <div className="small-devices-btn">
          <BackgroundImage
            src={get(iconDictionary, `${feature}_${isActive ? 'active' : 'not_active'}`) || IconReleasesSelected}
            width={50}
            height={50}
          />
        </div>
      </IconWrapper>
    </Link>
    <span>{startCase(feature)}</span>
  </Container>
);

FeatureButton.propTypes = {
  darkMode: PropTypes.bool,
  isActive: PropTypes.bool,
  feature: PropTypes.oneOf(['releases', 'analytics', 'upload', 'downloads']),
};

FeatureButton.defaultProps = {
  darkMode: false,
  isActive: false,
  feature: 'releases',
};

export default FeatureButton;
