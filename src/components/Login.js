import React from "react";
import Header from "./Header";

class Login extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        {/* <p>Sign in with Google</p> */}
        <button
          className="loginBtnGoogle"
          onClick={() => this.props.authenticate("Google")}
        >
          Log in with Google
          <i className="fab fa-google" />
        </button>
      </React.Fragment>
    );
  }
}

export default Login;
