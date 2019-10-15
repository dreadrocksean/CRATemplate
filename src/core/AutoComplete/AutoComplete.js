/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import styles from './autoComplete.module.scss';
import './autoComplete.scss';

const AutoComplete = ({ selectedOption, options, onChange, loading, loadingText, placeholder }) => (
  <div className={styles.root}>
    <Select
      classNamePrefix="select"
      defaultValue={loading ? loadingText : placeholder}
      isDisabled={!options.length}
      isLoading={loading}
      isClearable={true}
      isRtl={!options.length}
      isSearchable={true}
      options={options}
      value={selectedOption}
      onChange={onChange}
      placeholder={loading && !options.length ? loadingText : placeholder}
    />
  </div>
);

AutoComplete.propTypes = {
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default AutoComplete;
