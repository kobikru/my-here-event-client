import { useState,useContext } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import headerContext from "../../context/headerContext";
import Input from "../../components/Input";
import ClassicButton from "../../components/ClassicButton copy";
import { IoIosCreate } from "react-icons/io";
import apiCalls from "../../function/apiCalls";
import { setToken } from "../../function/token";
import userContext from "../../context/userContext";

function Registeretion() {
  const { setHeader } = useContext(headerContext);
  const { setUser } = useContext(userContext);
  setHeader("דף הרשמה");
  const [isValid, setIsValid] = useState(true);
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const navToLoginPage = () => {
    navigate("/login");
  };

  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: `🙍🏽‍♂️ שם מלא`,
      errorMessage: "הכנס שם",
      maxLength: "22",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "🗝️ הגדר סיסמא",
      errorMessage: "הכנס סיסמא",
      maxLength: "14",
      required: true,
    },
    {
      id: 4,
      name: "email",
      type: "email",
      placeholder: "כתובת אימייל 📧",
      errorMessage: "הכנס אימייל תקין",
      required: true,
    },
  ];

  const createUser = async (e) => {
    e.preventDefault();
    const formElement = e.target;
    setIsValid(formElement.checkValidity());
    formElement.classList.add(styles.submitted);
    const firstInvalidField = formElement.querySelector(":invalid");
    firstInvalidField?.focus();
    const name = userData.fullName.trim();
    const words = name.split(" ");

    // Filter out words with less than 2 letters
    const filteredWords = words.filter((word) => word.length >= 2);
    if (filteredWords.length >= 1) {
        const data = userData;
        const updatedData = {
          ...data,
          userType: "regular",
        };
        console.log(updatedData);
      if(formElement.checkValidity()){
        try {
          const res = await apiCalls("post", "user/creatUser", updatedData);
          if (!res.user.error) {
            if (res.token) {
              setUser(res.user);
              setToken(res.token);
              localStorage.setItem("Token", res.token);
              navigate("/",{ replace: true });
            } else {
              alert(res);
            }
          } else {
            alert(res.user.error);
          }
        } catch (error) {
          alert(error);
        }}
    } else {
      alert("יש לבחור שם מלא תיקני");
    }
  };

  const handleKeyDown = (e) => {
    const allowedKeys = /^[a-zA-Zא-ת ]$/;
    if (
      e.target.name === "fullName" &&
      !allowedKeys.test(e.key) &&
      e.key !== "Backspace"
    ) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "fullName") {
      const name = e.target.value;
      const filteredName = name.replace(/[^a-zA-Zא-ת ]/g, "");
      setUserData({ ...userData, [e.target.name]: filteredName });
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  // const handleChange = (e) => {
  //   setUserData({ ...userData, [e.target.name]: e.target.value });
  // };

  return (
    <div className={styles.main}>
      <form
        className={styles.formArea}
        noValidate
        onSubmit={createUser}
        autoComplete="on"
      >
        <div className={styles.header}>
          <span> נעים מאוד :)</span>
          <span> נשמח להכיר אותך, כמה פרטים חשובים ונמשיך</span>
        </div>
        <div className={styles.container}>
          {inputs.map((input) => {
            return (
              <div className={styles.field}>
                <Input
                  isValid={isValid}
                  key={input.id}
                  {...input}
                  width={"90%"}
                  className={styles.inputs}
                  errorMessage={input.errorMessage}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  maxLength={input.maxLength}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.create}>
          <ClassicButton width={"100%"} height={"50px"} type={"submit"}>
            <IoIosCreate className={styles.icon} /> צור משתמש
          </ClassicButton>
        </div>
      </form>
      <div className={styles.register}>
        <div>
          {" "}
          יש לך כבר חשבון?
          <span onClick={navToLoginPage} className={styles.clickHere}>
            לחץ כאן
          </span>
        </div>
      </div>
    </div>
  );
}

export default Registeretion;
