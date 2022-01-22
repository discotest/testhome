import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { startCase } from 'lodash';
import facebookLogo from 'assets/logo_facebook.png';
import googleLogo from 'assets/logo_google.png';
import { SMALL_DEVICES_WIDTH, MEDIUM_DEVICES_WIDTH } from 'utils/constants';
import BackgroundImage from './BackgroundImage';

const backgroundColors = {
  facebook: '#1877F2',
  google: '#FFFFFF',
};

const backgroundColorsHover = {
  facebook: '#0050ff',
  google: '#e2e2e2',
};

const labelColors = {
  facebook: '#FFFFFF',
  google: '#757575',
};

const ButtonContainer = styled.div`
  cursor: pointer;
  width: ${(props) => `${props.width}px`};
  height: 50px;
  display: flex;
  align-items: center;
  background-color: ${(props) => (backgroundColors[props.socialMedia])};
  color: ${(props) => (labelColors[props.socialMedia])};
  font-size: 18px;
  border-radius: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  &:hover {
    background-color: ${(props) => backgroundColorsHover[props.socialMedia]};
  }
  @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
    width: 350px;
  }
  @media (max-width: ${SMALL_DEVICES_WIDTH}px) {
    width: 290px;
  }
`;

const ContentContainer = styled.div`
  height: inherit;
  width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
  span {
    padding-left: 10px;
  }
`;

const SocialMediaButton = ({ socialMedia, width }) => (
  <ButtonContainer socialMedia={socialMedia} width={width}>
    <ContentContainer>
      <BackgroundImage
        src={socialMedia === 'facebook' ? facebookLogo : googleLogo}
        width={20}
        height={20}
      />
      <div>
        <span>
          {`Continue with ${startCase(socialMedia)}`}
        </span>
      </div>
    </ContentContainer>
  </ButtonContainer>
);

SocialMediaButton.propTypes = {
  socialMedia: PropTypes.string.isRequired,
  width: PropTypes.number,
};

SocialMediaButton.defaultProps = {
  width: 400,
};

export default SocialMediaButton;
