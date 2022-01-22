import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
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
import { get, isEmpty } from 'lodash';

const MAX_WIDTH_TO_SPLIT_FORM = '1150px';

const UploadContainer = styled.div`
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
  .input-wrapper {
    margin-top: 20px;
    width: inherit;
  }
  @media (max-width: ${MAX_WIDTH_TO_SPLIT_FORM}) {
    flex-direction: column;
  }
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
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .inline-input {
        width: inherit;
      }
    }
    @media (max-width: ${MAX_WIDTH_TO_SPLIT_FORM}) {
      margin-top: -20px;
    }
  }
`;

const TextAreaWrapper = styled.div`
  max-width: 93%;
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

const TrackTitleWrapper = styled.div`
  margin: auto;
  width: 900px;
  @media (max-width: ${MAX_WIDTH_TO_SPLIT_FORM}) {
    width: 450px;
    max-width: 100%;
  }
`;

const TrackFormContainer = styled.div`
  background-color: #E4E4E4;
  margin: auto;
  width: 900px;
  border-radius: 30px;
  @media (max-width: ${MAX_WIDTH_TO_SPLIT_FORM}) {
    width: 450px;
    max-width: 100%;
  }
`;

const AddButtonContainer = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddButton = styled.div`
  border: 3px solid black;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  color: black;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
`;

const AlbumForm = ({
  uploadAlbumForm,
  uploadAlbumFormUpdated,
  uploadAlbumFormTrackUpdated,
  uploadAlbumFormAddTrack,
  onSubmitUpload,
}) => {
  const [albumCoverImg, setAlbumCoverImg] = useState(null);
  const [tracksFiles, setTracksFiles] = useState({});

  const handleNumberOfTracksChange = (value) => {
    if (isEmpty(tracksFiles)) return;
    setTracksFiles((prevState) => Object.keys(prevState).reduce((acc, key) => ({
      ...acc,
      [key]: Number(key) < Number(value) ? prevState[key] : null,
    }), prevState));
  };

  return (
    <>
      <UploadContainer>
        <UploadFormWrapper>
          <div className="upload-form-container-1">
            <div className="img-upload-container">
              <ImageUpload
                size={400}
                label="Upload Album Cover Image"
                onUpload={(file) => setAlbumCoverImg(file)}
                borderRadius={30}
              />
            </div>
            <div className="img-upload-container-small-devices">
              <ImageUpload
                size={250}
                label="Upload Album Cover Image"
                onUpload={(file) => setAlbumCoverImg(file)}
                borderRadius={30}
              />
            </div>
          </div>
          <div className="upload-form-container-2">
            <Input
              label="Album Name"
              value={get(uploadAlbumForm, 'albumName', '')}
              onChange={(e) => uploadAlbumFormUpdated('albumName', e.target.value)}
            />
            <div className="input-wrapper">
              <Dropdown
                label="Number of Tracks"
                value={get(uploadAlbumForm, 'numberOfTracks.value', '1')}
                options={get(uploadAlbumForm, 'numberOfTracks.options', [])}
                onChange={(e) => {
                  handleNumberOfTracksChange(e.target.value);
                  uploadAlbumFormUpdated('numberOfTracks.value', e.target.value);
                }}
              />
            </div>
            <div className="input-wrapper">
              <Dropdown
                label="Album Genre"
                value={get(uploadAlbumForm, 'albumGenre.value', '')}
                options={get(uploadAlbumForm, 'albumGenre.options', [])}
                onChange={(e) => uploadAlbumFormUpdated('albumGenre.value', e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <Input
                label="Album Artist"
                tip="(leave blank to keep as @user)"
                placeholder="eg. dub techno, Trap"
                value={get(uploadAlbumForm, 'albumArtist', '')}
                onChange={(e) => uploadAlbumFormUpdated('albumArtist', e.target.value)}
              />
            </div>
          </div>
        </UploadFormWrapper>
        <TextAreaWrapper>
          <TextArea
            label="Album Description"
            height={210}
            value={get(uploadAlbumForm, 'description', '')}
            onChange={(e) => uploadAlbumFormUpdated('description', e.target.value)}
          />
        </TextAreaWrapper>
      </UploadContainer>
      {get(uploadAlbumForm, 'tracks', []).map((track, index) => (
        <div key={get(track, 'id', index)}>
          <TrackTitleWrapper>
            <h2>{`Track ${index + 1}`}</h2>
          </TrackTitleWrapper>
          <TrackFormContainer>
            <UploadFormWrapper>
              <div className="upload-form-container-1">
                <div className="input-wrapper">
                  <Input
                    label="Song Name"
                    value={get(track, 'songName', '')}
                    onChange={(e) => uploadAlbumFormTrackUpdated('songName', index, e.target.value)}
                  />
                </div>
                <div className="input-wrapper">
                  <Input
                    label="Song Artists"
                    tip="(leave blank to keep as @user)"
                    placeholder="eg. dub techno, Trap"
                    value={get(track, 'songArtists', '')}
                    onChange={(e) => uploadAlbumFormTrackUpdated('songArtists', index, e.target.value)}
                  />
                </div>
                <div className="audio-upload-container">
                  <FileInput
                    label="Upload Song File"
                    tip="(.wav only)"
                    placeholder="Choose file"
                    onUpload={(file) => setTracksFiles((prevState) => ({
                      ...prevState,
                      [index]: file,
                    }))}
                  />
                </div>
              </div>
              <div className="upload-form-container-2">
                <div className="input-wrapper">
                  <Dropdown
                    label="Genre"
                    value={get(track, 'genre.value', '')}
                    options={get(track, 'genre.options', [])}
                    onChange={(e) => uploadAlbumFormTrackUpdated('genre.value', index, e.target.value)}
                  />
                </div>
                <div className="input-wrapper">
                  <Input
                    label="Subgenres"
                    tip="(separated by comma)"
                    placeholder="eg. dub techno, Trap"
                    value={get(track, 'subgenres', '')}
                    onChange={(e) => uploadAlbumFormTrackUpdated('subgenres', index, e.target.value)}
                  />
                </div>
                <div className="input-wrapper input-wrapper-inline">
                  <div className="inline-input">
                    <Input
                      label="BPM"
                      value={get(track, 'bpm', '')}
                      onChange={(e) => uploadAlbumFormTrackUpdated('bpm', index, e.target.value)}
                    />
                  </div>
                  <div className="inline-input">
                    <Input
                      label="Key"
                      value={get(track, 'key', '')}
                      onChange={(e) => uploadAlbumFormTrackUpdated('key', index, e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </UploadFormWrapper>
          </TrackFormContainer>
        </div>
      ))}
      <AddButtonContainer>
        <AddButton onClick={uploadAlbumFormAddTrack}>
          +
        </AddButton>
      </AddButtonContainer>
      <ButtonContainer>
        <Button
          label="Submit"
          onClick={() => onSubmitUpload(albumCoverImg, tracksFiles, 'album')}
        />
      </ButtonContainer>
    </>
  );
};

AlbumForm.propTypes = {
  uploadAlbumForm: PropTypes.object.isRequired,
  uploadAlbumFormUpdated: PropTypes.func.isRequired,
  uploadAlbumFormTrackUpdated: PropTypes.func.isRequired,
  uploadAlbumFormAddTrack: PropTypes.func.isRequired,
  onSubmitUpload: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  uploadAlbumForm: artistUploadSelectors.uploadAlbumForm(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AlbumForm);
