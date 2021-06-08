import React from "react";
import PropTypes from "prop-types";
import {firebase} from "../../../lib/firebase";
import styles from "./SignInSocial.module.scss";
import clsx from "clsx";

const SignInSocial = ({signIn, onError, close}) => {
  const getProvider = (type) => {
    switch (type) {
      case "google": {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/userinfo.email");
        return provider;
      }

      case "facebook":
        return new firebase.auth.FacebookAuthProvider();

      default:
        return null;
    }
  };

  const handleSignIn = (type) => {
    const provider = getProvider(type);

    signIn(provider)
        .then(close)
        .catch(onError);
  };

  return (
    <div className={styles["sign-in-social"]}>

      <p>Sign in using social platforms</p>

      <button className={styles.fb} onClick={() => handleSignIn("facebook")}>
        <i class="fab fa-facebook"></i>
      </button>

      <button className={styles.google} onClick={() => handleSignIn("google")}>
        <i class="fab fa-google"></i>
      </button>

    </div>
  );
};
SignInSocial.propTypes = {
  signIn: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

SignInSocial.defaultProps = {
  close: () => {},
};
export default SignInSocial;
