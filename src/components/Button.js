import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

const backgroundColors = {
  blue: '#007BFF',
  black: '#000000',
};

const backgroundColorsHover = {
  blue: '#0065ff',
  black: '#030303',
};

const labelColors = {
  blue: '#FFFFFF',
  black: '#E9E5D7',
};

const StyledButton = styled.div`
  border-radius: ${(props) => props.borderRadius}px;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  cursor: ${(props) => (props.disabled ? 'auto' : 'pointer')};
  filter: ${(props) => (props.disabled ? 'grayscale(0.7)' : 'grayscale(0)')};
  background-color: ${(props) => backgroundColors[props.color]};
  color: ${(props) => labelColors[props.color]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.fontSize}px;
  margin: auto;
  &:hover {
    background-color: ${(props) => (props.disabled
    ? backgroundColors[props.color]
    : backgroundColorsHover[props.color])};
  }
  border: ${(props) => (props.hasActiveBorder ? '3px solid #FF4D00' : 'none')};
`;

const Button = ({
  label, color, width, height, hasActiveBorder, onClick, disabled, borderRadius, fontSize,
}) => (
  <StyledButton
    color={color}
    width={width}
    height={height}
    hasActiveBorder={hasActiveBorder}
    disabled={disabled}
    onClick={disabled ? noop : onClick}
    borderRadius={borderRadius}
    fontSize={fontSize}
  >
    {label}
  </StyledButton>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['blue', 'black']),
  width: PropTypes.number,
  height: PropTypes.number,
  hasActiveBorder: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  borderRadius: PropTypes.number,
  fontSize: PropTypes.number,
};

Button.defaultProps = {
  color: 'blue',
  width: 200,
  height: 50,
  hasActiveBorder: false,
  disabled: false,
  borderRadius: 15,
  fontSize: 18,
};

export default Button;
