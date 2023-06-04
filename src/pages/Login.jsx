import { useContext, useState } from "react";
import { AuthContext } from "../shared/AuthContext";
import { NavLink } from "react-router-dom";
export default function Login() {
    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const { setUserDetail, isLoggedIn } = useContext(AuthContext);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginForm((val) => {
            return {
                ...val,
                [name]: value,
            };
        });
    };
    const onSubmit = (e) => {
        //make POST call after validations
        console.log("e", loginForm);
        fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(loginForm),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                if (res.encodedToken && res.foundUser) {
                    setUserDetail(res.foundUser);
                }
                //todo -->handle error
            })
            .catch((err) => console.log(err));
    };
    const valid = () => {
        //Add more validations in future
        return loginForm.email.length > 0 && loginForm.password.length > 0;
    };
    return (
        <div className="login-container">
            <input
                placeholder="Enter email..."
                value={loginForm.email}
                onChange={handleChange}
                name="email"
            />
            <input
                placeholder="Enter password..."
                value={loginForm.password}
                onChange={handleChange}
                name="password"
                type="password"
            />
            <button
                disabled={!valid()}
                onClick={onSubmit}
                className="login-submit-btn"
            >
                Submit
            </button>
            <NavLink to="/signup">
                Don't have a account?..click here to create a account
            </NavLink>
        </div>
    );
}
