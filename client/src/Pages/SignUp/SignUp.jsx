import React from "react";
import "../SignUp/SignUp.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="signup">
      <h1>Sing Up</h1>

      <form>
        <input type="text" placeholder="username" id="username" />
        <input type="email" placeholder="email" id="email" />
        <input type="password" placeholder="password" id="password" />
        <button>Sign Up</button>
      </form>

      <div className="haveAnAccount">
        <p>Have an account?</p>
        <Link to="/sign-in" className="link">
          <span>Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
