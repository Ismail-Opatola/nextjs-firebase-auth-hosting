import React from "react";
import PropTypes from "prop-types";
import ResponsiveModal from "react-responsive-modal";
import styles from "./Modal.module.scss";
import clsx from "clsx";

const Modal = ({children, visible, onClose, noPadding, menu, whiteClose, noClose}) => {
  return (
    <ResponsiveModal
      open={visible}
      onClose={onClose ? onClose : () => {}}
      classNames={{
        modal: clsx(styles.modal, {
          [styles["no-padding"]]: noPadding,
          [styles.menu]: menu,
          ["hide"]: !visible,
        }),
        overlay: clsx(styles["modal-overlay"], {[styles.menu]: menu}),
        closeButton: clsx(styles["modal-close"], {[styles.white]: whiteClose}),
      }}
      showCloseIcon={!noClose}
      center
    >
      {children}
    </ResponsiveModal>
  );
};

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  noPadding: PropTypes.bool,
  noClose: PropTypes.bool,
  menu: PropTypes.bool,
  whiteClose: PropTypes.bool,
};

export default Modal;
