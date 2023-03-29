import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import apiCalls from '../../function/apiCalls';
import ClassicButton from '../ClassicButton copy';
import Input from '../Input';
import styles from "./style.module.css";

// creator: sapir 



function ForgetPassword() {
    const [codeToReset, setCodeToReset] = useState();
    const[userEmail,setUserEmail] = useState()
    const navigate = useNavigate();

    const handleSendToEmail = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        setUserEmail(email)
        const code = Math.floor(Math.random() * 9000 + 1000);
        apiCalls('post', '/user/forgetPassword', { email, code });
        setCodeToReset(code);
    }

    const verifyCode = (e) => {
        e.preventDefault();
        if (codeToReset == e.target.code.value) {
            navigate("/resetPassword", {state: { email: userEmail  }})
            console.log("good");
        }
        else {
            console.log("no");
        }

    }

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <h2>forgot password</h2>
                {!codeToReset ?
                    <form className={styles.form} onSubmit={handleSendToEmail}>
                        <Input
                            placeholder={"הכנס את כתובת המייל שלך"}
                            width={'300px'}
                            name={'email'}
                        />
                        <div className={styles.firstButton}>
                            <ClassicButton
                                text={"שלח"}
                                width={'70%'}
                                type={'submit'}
                            />
                        </div>
                    </form>
                    :
                    <div>
                        <form onSubmit={verifyCode} className={styles.form} >
                            <div className={styles.form}>
                                <p>שלחנו לך קוד לכתובת המייל</p>
                                <Input
                                    placeholder={"הכנס את הקוד"}
                                    width={'300px'}
                                    name={'code'}
                                />
                            </div>
                            <div className={styles.firstButton}>
                            <ClassicButton
                                text={"הכנס"}
                                width={'70%'}
                            />
                            </div>
                        </form>
                    </div>
                }
            </div>
        </div>

    )


    // <div className={styles.auth_container}>
    //     <div className={styles.auth_form}>
    //         <h2>forgot password</h2>
    //         {!codeToReset ?
    //             <form onSubmit={handleSendToEmail}>
    //                 <div className={styles.form_control}>
    //                     <label htmlFor="email">Email</label>
    //                     <input
    //                         name='email'
    //                         type="email"
    //                         id="email"
    //                         placeholder="Enter your email"
    //                     />
    //                 </div>

    //                 <button className={styles.button}>Send</button>
    //             </form>
    //             :
    //             <div>
    //                 <form onSubmit={verifyCode} >
    //                     <div className={styles.form_control}>
    //                         <p>We will send you a password reset code to your email</p>
    //                         <input
    //                             name='code'
    //                             placeholder="Enter your code"
    //                         />
    //                     </div>
    //                     <button className={styles.button}>enter</button>
    //                 </form>
    //             </div>
    //         }
    //     </div>
    // </div>
    // )
}

export default ForgetPassword