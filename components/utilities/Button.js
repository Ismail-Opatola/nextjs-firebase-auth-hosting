import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";
import clsx from "clsx";

const Button = ({children, loading, onClick}) => (
  <button className={styles.button} onClick={onClick}>
    {children}

    {/* <span className={loading ? "loading visible" : "loading"}> */}
    <span className={clsx(styles.loading, {[styles.visible]: loading})}>
      <span className={styles["double-bounce1"]}></span>
      <span className={styles["double-bounce2"]}></span>
    </span>
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
};

export default Button;
