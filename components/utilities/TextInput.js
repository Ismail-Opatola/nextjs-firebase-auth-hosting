import React, {useState} from "react";
import PropTypes from "prop-types";
import styles from "./TextInput.module.scss";
/**
 * Text Input box - reusable element
 */
const TextInput = ({onChange, disabled, value, validate, type, placeholder, error}) => {
  const [state, setState] = useState({
    pristine: true,
  });

  const handleChange = (value) => {
    const {pristine} = state;

    if (disabled) return false;
    if (pristine) setState({pristine: false});

    onChange(value);

    if (validate) validate(value);
  };

  const handleBlur = () => {
    const {pristine} = state;

    if (validate && !pristine) validate(value);
  };

  return (
    <div className={styles["text-input"]}>

      <input
        type={type || "text"}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        disabled={!!disabled}
        onBlur={handleBlur}
      />

      {error && <div className={styles.error}>{error}</div>}

    </div>
  );
};

TextInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  validate: PropTypes.func,
};

export default TextInput;
