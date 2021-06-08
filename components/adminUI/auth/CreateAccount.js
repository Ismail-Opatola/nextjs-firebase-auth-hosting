import React, {useState} from "react";
import {
  createUserService,
  sendVerificationEmailService,
  signInSocialService,
} from "../../../lib/services/auth.service";
import SignInSocial from "./SignInSocial";
import TextInput from "../utilities/TextInput";
import Button from "../utilities/Button";
import "./CreateAccount.module.scss";

const initialState = {
  email: "",
  password: "",
  emailError: "",
  passwordError: "",
  serverError: "",
  submitted: false,
  loading: false,
};

const CreateAccount = ({close}) => {
  const [state, setState] = useState(initialState);

  const getValidation = (type, value) => {
    switch (type) {
      case "email":
        if (!value.length) return "Email is required";
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) return "Email is not valid";
        return "";
      case "password":
        if (value.length === 0) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters long";
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
    const {email, password} = state;

    const emailError = validateInput("email", email);
    const emailValid = emailError.length === 0;

    const pwdError = validateInput("password", password);
    const pwdValid = pwdError.length === 0;

    return (emailValid && pwdValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {email, password} = state;

    setState({submitted: true});

    if (isFormValid()) {
      setState({loading: true});

      createUserService(email, password)
          .then(sendVerificationEmailService)
          .then(close)
          .catch(handleError);
    }
  };

  const handleError = (error) => {
    setState({serverError: error.code, loading: false});
  };

  const {email, password, submitted, emailError, passwordError, serverError, loading} = state;

  return (
    <div className="create-account">
      <form onSubmit={handleSubmit}>

        <h1>Create new account</h1>

        <TextInput
          placeholder="Email"
          value={email}
          onChange={(value) => setState({email: value})}
          error={submitted ? emailError : ""}
          validate={(value) => validateInput("email", value)}
        />

        <TextInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(value) => setState({password: value})}
          error={submitted ? passwordError : ""}
          validate={(value) => validateInput("password", value)}
        />

        <Button loading={loading}>Create account</Button>

        {serverError.length > 0 && <div className="server-error">{serverError}</div>}

      </form>

      <SignInSocial
        signIn={signInSocialService}
        onError={handleError}
        close={close}
      />
    </div>
  );
};

CreateAccount.defaultProps = {
  close: () => {},
};

export default CreateAccount;
