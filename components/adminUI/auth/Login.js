import React, {useState} from "react";
import {
  signInWithEmailAndPwdService,
  signInWithSocialService,
  sendPasswordResetEmailService,
} from "../../../lib/services/auth.service";
import SignInSocial from "./SignInSocial";
import {TextInput, Button} from "../../utilities";
import styles from "./LogIn.module.scss";

const initialState = {
  email: "",
  password: "",
  emailError: "",
  passwordError: "",
  serverError: "",
  submitted: false,
  loading: false,
  forgottenPwd: false,
};

const LogIn = ({close}) => {
  const [state, setState] = useState(initialState);

  const getValidation = (type, value) => {
    switch (type) {
      case "email":
        if (!value || value.trim() === "") return "Email is required";
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) return "Email is not valid";
        return "";
      case "password":
        if (!value || value.trim() === "") return "Password is required";
        return "";
      default:
        return "";
    }
  };

  const validateInput = (key, value) => {
    const error = getValidation(key, value);
    setState({[key+"Error"]: error});
    return error;
  };

  const isFormValid = () => {
    const {email, password, forgottenPwd} = state;

    const emailError = validateInput("email", email);
    const emailValid = !emailError || emailError.trim() === "";

    if (forgottenPwd) return emailValid;

    const pwdError = validateInput("password", password);
    const pwdValid = pwdError.trim() === "";

    return (emailValid && pwdValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {email, password, forgottenPwd} = state;

    setState({submitted: true});

    if (isFormValid()) {
      setState({loading: true});

      if (forgottenPwd) {
        sendPasswordResetEmailService(email)
            .then(() => setState({forgottenPwd: false, serverError: "We've sent password reset form to your inbox"}))
            .catch(handleError);
      } else {
        signInWithEmailAndPwdService(email, password)
            .then(close)
            .catch(handleError);
      }
    }
  };

  const handleError = (error) => {
    setState({serverError: error.code, loading: false});
  };

  const {email, password, emailError, passwordError, submitted, serverError, forgottenPwd, loading} = state;

  return (
    <div className={styles["sign-in"]}>
      <form onSubmit={handleSubmit}>

        <h1>{!forgottenPwd ? "Sign in" : "Forgotten password"}</h1>

        <TextInput
          placeholder="Email"
          value={email}
          onChange={(value) => setState({email: value})}
          error={submitted ? emailError : ""}
          validate={(value) => validateInput("email", value)}
        />

        {!forgottenPwd && (
          <TextInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(value) => setState({password: value})}
            error={submitted ? passwordError : ""}
            validate={(value) => validateInput("password", value)}
          />
        )}

        <Button loading={loading}>
          {!forgottenPwd ? "Sign in" : "Send password reset"}
        </Button>

        {serverError && <div className={styles["server-error"]}>{serverError}</div>}

        <div className={styles.forgotten}>
          <a onClick={() => setState({forgottenPwd: !forgottenPwd})}>{!forgottenPwd ? "Forgot your password?" : "Try to sign in"}</a>
        </div>

      </form>

      <SignInSocial
        signIn={signInWithSocialService}
        onError={handleError}
        close={close}
      />
    </div>
  );
};

LogIn.defaultProps = {
  close: () => {},
};

export default LogIn;

