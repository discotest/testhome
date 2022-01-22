import { get } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { SMALL_DEVICES_WIDTH } from 'utils/constants';

const DropdownContainer = styled.div`
  width: 100%;
`;

const StyledLabel = styled.div`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 10px;
  @media (max-width: ${SMALL_DEVICES_WIDTH}px) {
    font-size: 18px;
  }
`;

const CustomSelect = styled.select`
  position: relative;
  width: inherit;
  border: 1px solid #E5E5E5;
  height: 54px;
  border-radius: 5px;
  font-size: 18px;
  color: #868D96;
  padding-left: 15px;
`;

const Dropdown = ({
  label, value, options, disabled, onChange,
}) => (
  <DropdownContainer>
    {label && <StyledLabel>{label}</StyledLabel>}
    <CustomSelect value={value} disabled={disabled} onChange={onChange}>
      {options.map((item, index) => (
        <option value={get(item, 'value', '')} key={`dropdown_value_${get(item, 'value', index)}`}>
          {get(item, 'label', '')}
        </option>
      ))}
    </CustomSelect>
  </DropdownContainer>
);

Dropdown.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  label: '',
  value: '',
  options: [],
  disabled: false,
};

export default Dropdown;
