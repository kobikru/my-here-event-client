import React, { useContext, useState } from "react";
import headerContext from "../../context/headerContext";
import styles from "./style.module.css";
import Input from "../../components/Input";
import ToggleSwitch from "../../components/ToggleSwitch";
import ClassicButton from "../../components/ClassicButton copy";
import { FaSignInAlt } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../function/token";
import axios from "axios";
import userContext from "../../context/userContext";
import apiCalls from "../../function/apiCalls";
import ReactGA from "react-ga4";
import getGoogleOAuthURL from "../../function/getGoogleOAuthURL";

// creator: Yisrael Olonoff
// login page

function Login() {
  const eventTracker = (
    action = "test action",
    label = "test label",
    category = "Blog category"
  ) => {
    ReactGA.event({ category, action, label });
  };
  const { user, setUser } = useContext(userContext);
  const { setHeader } = useContext(headerContext);
  const [isValid, setIsValid] = useState(true);
  setHeader("login");

  const [checked, setChecked] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  // const [ errMsg, setErrMsg ] = useState();

  const navigate = useNavigate();

  const navToRegistretionPage = () => {
    navigate("/registeretion");
  };

  const navToForgetPassword = () => {
    navigate("/forgetPassword");
  };

  const loginAouth = async (e) => {
    e.preventDefault();
    const formElement = e.target;
    setIsValid(formElement.checkValidity());
    formElement.classList.add(styles.submitted);
    const firstInvalidField = formElement.querySelector(":invalid");
    firstInvalidField?.focus();
    const res = await apiCalls("post", "user/login", {
      email: userInfo.email,
      password: userInfo.password,
    });

    if (res.token) {
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem("Token", res.token);
      eventTracker('login',res.user.email,'userLogin')
      navigate("/",{ replace: true });
    } else if(res.error==='Error generating JWT token'){
      alert("למשתמש זה אין סיסמא, יש לבצע הרשמה!")
    } 
    else {
      alert(res);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const handleToggleSwitch = (e) => {
    setChecked(!checked);
  };

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "אימייל 📧",
      errMessage: "הכנס מייל חוקי",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "🗝️ סיסמא",
      errMessage: "הכנס סיסמא",
      required: true,
    },
  ];

  return (
    // <div className={styles.main}>
    <div className={styles.container}>
      <h2 className={styles.connection}>התחברות</h2>
      <form onSubmit={loginAouth} noValidate className={styles.form}>
        {inputs.map((input) => {
          return (
            <div className={styles.connect}>
              <Input
                isValid={isValid}
                errorMessage={input.errMessage}
                autoComplete="off"
                key={input.id}
                {...input}
                // width={'400px'}
                className={styles.inputs}
                onChange={handleChange}
              />
            </div>
          );
        })}
        <div className={styles.remember}>
          <ToggleSwitch
            text={"זכור אותי"}
            checked={checked}
            onChange={handleToggleSwitch}
          />
        </div>

        <div className={styles.firstButton}>
          <ClassicButton width={"100%"} height={"50px"} type={"submit"}>
            <FaSignInAlt className={styles.icon} /> התחברות
          </ClassicButton>
        </div>
      </form>
      <div className={styles.firstButton}>
        <ClassicButton width={"100%"} height={"50px"}>
          <a href={getGoogleOAuthURL()}>Login with Google</a>
        </ClassicButton>
        
      </div>
      <div className={styles.question}>
        <div className={styles.forgotPassword} onClick={navToForgetPassword}>
          ?שכחת סיסמא{" "}
        </div>

        <div className={styles.register}>
          <div>
            {" "}
            עדיין אין לך חשבון?
            <span onClick={navToRegistretionPage} className={styles.clickHere}>
              לחץ כאן
            </span>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
export default Login;
