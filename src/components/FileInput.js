import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
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

const StyledInput = styled.div`
  height: 50px;
  border-radius: 5px;
  width: inherit;
  font-size: 18px;
  color: #868D96;
  cursor: pointer;
  border: 1px solid #CED4DA;
  display: flex;
  align-items: center;
  justify-content: center;
  .filename-container {
    width: 80%;
    height: inherit;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: left;
    span {
      padding-left: 15px;
    }
  }
  .browse-container {
    background-color: #E4E4E4;
    width: 30%;
    height: inherit;
    top: -1px;
    right: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    font-size: 15px;
    border-left: 1px solid #CED4DA;
  }
`;

const FileInput = ({
  label, placeholder, width, onUpload, tip,
}) => {
  const [fileName, setFileName] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      onUpload(file);
      const { name } = file;
      setFileName(name);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'audio/wav' });
  return (
    <InputContainer width={width} {...getRootProps()}>
      {label && (
        <StyledLabel>
          <span>{label}</span>
          <span className="tip">{tip}</span>
        </StyledLabel>
      )}
      <StyledInput>
        <div className="filename-container">
          <span>{fileName ?? placeholder}</span>
        </div>
        <div className="browse-container">Browse</div>
        <input {...getInputProps()} />
      </StyledInput>
    </InputContainer>
  );
};

FileInput.propTypes = {
  label: PropTypes.string,
  tip: PropTypes.string,
  placeholder: PropTypes.string,
  width: PropTypes.number,
  type: PropTypes.oneOf(['text', 'number', 'password']),
  onUpload: PropTypes.func.isRequired,
};

FileInput.defaultProps = {
  label: '',
  placeholder: '',
  width: 0,
  type: 'text',
  tip: '',
};

export default FileInput;
