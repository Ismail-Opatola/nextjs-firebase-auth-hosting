import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import {sendVerificationEmailService} from "../../../lib/services/auth.service";
import {useAuth} from "../../../lib/services/auth.context";
import "./VerifyEmail.module.scss";

const VerifyEmail = () => {
  const [state, setState] = useState({
    sent: false,
  });

  const {user} = useAuth();

  const sendVerificationEmail = async () => {
    try {
      await sendVerificationEmailService();
      setState({sent: true});
    } catch (err) {
      console.error(err);
    }
  };

  const {sent} = state;

  return (
    <div className="verify-email">

      <h1>Verify your email address</h1>

      <p>Please check your mailbox <b>{user.email}</b>. A verification email is waiting for you.</p>

      {!sent ?
        <p>Did not receive the email? <a onClick={sendVerificationEmail}>Send again</a></p> :
        <p><b>Verification email sent!</b></p>
      }

    </div>
  );
};

export default VerifyEmail;

