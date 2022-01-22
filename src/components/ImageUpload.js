import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SMALL_DEVICES_WIDTH } from 'utils/constants';
import BackgroundImage from './BackgroundImage';

const CustomUploadButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.borderRadius}px;
  background-color: white;
  font-size: 30px;
  cursor: pointer;
  margin-top: 10px;
`;

const StyledLabel = styled.div`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 10px;
  @media (max-width: ${SMALL_DEVICES_WIDTH}px) {
    font-size: 18px;
  }
`;

const ImageUpload = ({
  size, borderRadius, label, onUpload,
}) => {
  const [uploadSrc, setUpload] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      onUpload(file);
      const reader = new FileReader();

      reader.onload = () => {
        const { result } = reader;
        setUpload(result);
      };
      reader.readAsDataURL(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/jpeg, image/png' });

  if (uploadSrc) {
    return (
      <>
        {label && <StyledLabel>{label}</StyledLabel>}
        <BackgroundImage
          width={size}
          height={size}
          borderRadius={borderRadius}
          src={uploadSrc}
        />
      </>
    );
  }

  return (
    <>
      {label && <StyledLabel>{label}</StyledLabel>}
      <CustomUploadButton size={size} borderRadius={borderRadius} {...getRootProps()}>
        <div>
          <span>+</span>
        </div>
        <input {...getInputProps()} />
      </CustomUploadButton>
    </>
  );
};

ImageUpload.propTypes = {
  size: PropTypes.number,
  borderRadius: PropTypes.number,
  label: PropTypes.string,
  onUpload: PropTypes.func.isRequired,
};

ImageUpload.defaultProps = {
  size: 20,
  borderRadius: 15,
  label: '',
};

export default ImageUpload;
