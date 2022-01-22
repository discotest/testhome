import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { SMALL_DEVICES_WIDTH } from 'utils/constants';

const InputContainer = styled.div`
  margin-top: 10px;
  width: ${(props) => (props.width ? `${props.width}px` : 'inherit')};
  min-width: 100px;
`;

const StyledLabel = styled.div`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 10px;
  @media (max-width: ${SMALL_DEVICES_WIDTH}px) {
    font-size: 18px;
  }
  .tip {
    font-size: 15px;
    padding-left: 5px;
    @media (max-width: ${SMALL_DEVICES_WIDTH}px) {
      font-size: 12px;
    }
  }
`;

const StyledInput = styled.textarea`
  border: 1px solid #E5E5E5;
  height: ${(props) => (props.height)}px;
  border-radius: 5px;
  width: calc(100% - 20px);
  font-size: 18px;
  color: #868D96;
  padding-left: 15px;
  padding-top: 15px;
`;

const TextArea = ({
  label, placeholder, width, height, value = '', type, onChange, tip,
}) => (
  <InputContainer width={width}>
    {label && (
      <StyledLabel>
        <span>{label}</span>
        <span className="tip">{tip}</span>
      </StyledLabel>
    )}
    <StyledInput
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      height={height}
    />
  </InputContainer>
);

TextArea.propTypes = {
  label: PropTypes.string,
  tip: PropTypes.string,
  placeholder: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  value: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number', 'password']),
  onChange: PropTypes.func.isRequired,
};

TextArea.defaultProps = {
  label: '',
  placeholder: '',
  width: 0,
  height: 50,
  value: '',
  type: 'text',
  tip: '',
};

export default TextArea;
