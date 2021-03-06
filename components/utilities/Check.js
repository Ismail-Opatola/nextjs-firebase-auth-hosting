import React from "react";
import PropTypes from "prop-types";
import styles from "./Check.module.scss";

const Check = ({checked, onChange}) => (
  <div className={styles.check}>
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span></span>
    </label>
  </div>
);

Check.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Check;
