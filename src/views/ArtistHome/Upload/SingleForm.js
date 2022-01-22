import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { bindActionCreators } from 'redux';
import ImageUpload from 'components/ImageUpload';
import Input from 'components/Input';
import FileInput from 'components/FileInput';
import Dropdown from 'components/Dropdown';
import TextArea from 'components/TextArea';
import Button from 'components/Button';
import { SMALL_DEVICES_WIDTH } from 'utils/constants';
import actions from 'state/artistUpload/actions';
import * as artistUploadSelectors from 'state/artistUpload/selectors';

const MAX_WIDTH_TO_SPLIT_FORM = '1150px';

const UploadContainer = styled.div`
  background-color: #E4E4E4;
  border-radius: 30px;
  margin: auto;
  width: 900px;
  @media (max-width: ${MAX_WIDTH_TO_SPLIT_FORM}) {
    width: 450px;
    max-width: 100%;
  }
`;

const UploadFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  .img-upload-container {
    padding-top: 10px;
    @media (max-width: ${SMALL_DEVICES_WIDTH}px) {
      display: none;
    }
  }
  .img-upload-container-small-devices {
    @media (min-width: ${SMALL_DEVICES_WIDTH + 1}px) {
      display: none;
    }
  }
  @media (max-width: ${MAX_WIDTH_TO_SPLIT_FORM}) {
    flex-direction: column;
  }
  .upload-form-container-1 {
    width: 400px;
    margin: 25px;
    .audio-upload-container {
      margin-top: 23px;
    }
    @media (max-width: ${SMALL_DEVICES_WIDTH}px) {
      width: inherit;
    }
  }
  .upload-form-container-2 {
    width: inherit;
    margin: 25px;
    .input-wrapper {
      margin-top: 20px;
      width: inherit;
    }
    .input-wrapper.input-wrapper-inline {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .inline-input {
        width: inherit;
      }
    }
  }
`;

const TextAreaWrapper = styled.div`
  max-width: 95%;
  margin: auto;
  height: 300px;
  @media (max-width: ${MAX_WIDTH_TO_SPLIT_FORM}) {
    max-width: 85%;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const SingleForm = ({ uploadSingleForm, uploadSingleFormUpdated, onSubmitUpload }) => {
  const [albumCoverImg, setAlbumCoverImg] = useState(null);
  const [tracksFile, setTrackFile] = useState({});

  return (
    <>
      <UploadContainer>
        <UploadFormWrapper>
          <div className="upload-form-container-1">
            <div className="img-upload-container">
              <ImageUpload
                size={400}
                label="Upload Cover Image"
                onUpload={(file) => setAlbumCoverImg(file)}
                borderRadius={30}
              />
            </div>
            <div className="img-upload-container-small-devices">
              <ImageUpload
                size={260}
                label="Upload Cover Image"
                onUpload={(file) => setAlbumCoverImg(file)}
                borderRadius={30}
              />
            </div>
            <div className="audio-upload-container">
              <FileInput
                label="Upload Song File"
                tip="(.wav only)"
                placeholder="Choose file"
                onUpload={(file) => setTrackFile((prevState) => ({
                  ...prevState,
                  0: file,
                }))}
              />
            </div>
          </div>
          <div className="upload-form-container-2">
            <Input
              label="Song Name"
              value={get(uploadSingleForm, 'songName', '')}
              onChange={(e) => uploadSingleFormUpdated('songName', e.target.value)}
            />
            <div className="input-wrapper">
              <Dropdown
                label="Genre"
                options={get(uploadSingleForm, 'genre.options', [])}
                value={get(uploadSingleForm, 'genre.value', '')}
                onChange={(e) => uploadSingleFormUpdated('genre.value', e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <Input
                label="Subgenres"
                tip="(separated by comma)"
                placeholder="eg. dub techno, Trap"
                value={get(uploadSingleForm, 'subgenres', '')}
                onChange={(e) => uploadSingleFormUpdated('subgenres', e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <Input
                label="Album Artist"
                tip="(leave blank to keep as @user)"
                placeholder="eg. dub techno, Trap"
                value={get(uploadSingleForm, 'albumArtist', '')}
                onChange={(e) => uploadSingleFormUpdated('albumArtist', e.target.value)}
              />
            </div>
            <div className="input-wrapper input-wrapper-inline">
              <div className="inline-input">
                <Input
                  label="BPM"
                  value={get(uploadSingleForm, 'bpm', '')}
                  onChange={(e) => uploadSingleFormUpdated('bpm', e.target.value)}
                />
              </div>
              <div className="inline-input">
                <Input
                  label="Key"
                  value={get(uploadSingleForm, 'key', '')}
                  onChange={(e) => uploadSingleFormUpdated('key', e.target.value)}
                />
              </div>
            </div>
          </div>
        </UploadFormWrapper>
        <TextAreaWrapper>
          <TextArea
            label="Description"
            height={210}
            value={get(uploadSingleForm, 'description', '')}
            onChange={(e) => uploadSingleFormUpdated('description', e.target.value)}
          />
        </TextAreaWrapper>
      </UploadContainer>
      <ButtonContainer>
        <Button
          label="Submit"
          onClick={() => onSubmitUpload(albumCoverImg, tracksFile, 'ep')}
        />
      </ButtonContainer>
    </>
  );
};

SingleForm.propTypes = {
  uploadSingleForm: PropTypes.object.isRequired,
  uploadSingleFormUpdated: PropTypes.func.isRequired,
  onSubmitUpload: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  uploadSingleForm: artistUploadSelectors.uploadSingleForm(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SingleForm);
