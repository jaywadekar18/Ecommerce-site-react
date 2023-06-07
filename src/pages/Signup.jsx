import { useState, useContext } from "react";
import { AuthContext } from "../shared/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [signupForm, setSignupFormForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();
  const { setUserDetail, isLoggedIn } = useContext(AuthContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupFormForm((val) => {
      return {
        ...val,
        [name]: value,
      };
    });
  };
  const onSubmit = (e) => {
    //make POST call after validations
    fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(signupForm),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.encodedToken && res.createdUser) {
          setUserDetail(res.createdUser);
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
  };
  const valid = () => {
    //Add more validations in future
    return signupForm.email.length > 0 && signupForm.password.length > 0;
  };
  return (
    <div className="login-container">
      <input
        placeholder="Enter email..."
        value={signupForm.email}
        onChange={handleChange}
        name="email"
      />
      <input
        placeholder="Enter first name..."
        value={signupForm.firstName}
        onChange={handleChange}
        name="firstName"
      />
      <input
        placeholder="Enter last name..."
        value={signupForm.lastName}
        onChange={handleChange}
        name="lastName"
      />
      <input
        placeholder="Enter password..."
        value={signupForm.password}
        onChange={handleChange}
        name="password"
        type="password"
      />
      <input
        placeholder="Confirm password..."
        value={signupForm.confirmPassword}
        onChange={handleChange}
        name="confirmPassword"
        type="password"
      />
      <button
        disabled={!valid()}
        onClick={onSubmit}
        className="login-submit-btn"
      >
        Submit
      </button>
    </div>
  );
}
