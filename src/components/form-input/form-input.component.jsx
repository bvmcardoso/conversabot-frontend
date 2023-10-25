/** @format */
import React from 'react';
import './form-input.styles.scss';

const FormInput = ({ label, value, onChange, ...otherProps }) => {
  return (
    <div className="form-input-container">
      <label>{label}</label>
      <textarea type="text" value={value} onChange={onChange} {...otherProps} />
    </div>
  );
};

export default FormInput;
