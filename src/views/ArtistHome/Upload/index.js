import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SMALL_DEVICES_WIDTH } from 'utils/constants';
import actions from 'state/artistUpload/actions';
import * as artistUploadSelectors from 'state/artistUpload/selectors';
import SingleForm from './SingleForm';
import AlbumForm from './AlbumForm';

const UploadContainer = styled.div`
  margin-top: 40px;
`;

const ToggleContainer = styled.div`
  margin: auto;
  margin-top: 50px;
  text-align: center;
`;

const UploadHeader = styled.h1`
  cursor: pointer;
  .option-single {
    color: ${(props) => (props.selectedForm === 'single' ? '#030303' : '#6B6B6B')};
  }
  .option-album {
    color: ${(props) => (props.selectedForm === 'album' ? '#030303' : '#6B6B6B')};
    padding-left: 50px;
    @media (max-width: ${SMALL_DEVICES_WIDTH}px) {
      padding-left: 25px;
    }
  }
  @media (max-width: ${SMALL_DEVICES_WIDTH}px) {
    font-size: 28px;
  }
`;

const Upload = ({ selectedForm, switchFormType }) => (
  <UploadContainer>
    <h1>Upload</h1>
    <ToggleContainer>
      <UploadHeader selectedForm={selectedForm}>
        <span
          className="option-single"
          onClick={() => switchFormType('single')}
        >
          Single
        </span>
        <span
          className="option-album"
          onClick={() => switchFormType('album')}
        >
          Album / EP
        </span>
      </UploadHeader>
    </ToggleContainer>
    {selectedForm === 'single' && <SingleForm />}
    {selectedForm === 'album' && <AlbumForm />}
  </UploadContainer>
);

Upload.propTypes = {
  selectedForm: PropTypes.string,
  switchFormType: PropTypes.func.isRequired,
};

Upload.defaultProps = {
  selectedForm: 'single',
};

const mapStateToProps = (state) => ({
  selectedForm: artistUploadSelectors.selectedForm(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Upload);
