import styles from "./style.module.css";
import { useState } from "react";

// creator: Kobi Krumbein
// color: _______________
// icon: ________________

const Input = (props) => {
  const { label, className = "", type, onChange, width, ...inputProps } = props;
  // const onChange = (e) => {
  //   if (e.target.type === "file") {
  //     console.log("file", e.target.files);
  //   }
  // };
  return (
    <>
      {type !="radio"?
      <div>
        <label className={styles.label}>
          <div>{label} </div>
        </label>
        <input
          className={`${styles.input} ${className}`}
          {...inputProps}
          // style={{ width: width }}
          onChange={onChange}
          type={type}
        />
      </div>
      :
      <div className={styles.radio}>
      <input
        className={`${styles.input} ${className}`}
        {...inputProps}
        style={{ width: width }}
        onChange={onChange}
        type={type}
      />
      <label className={styles.labelRadio}>
        <div>{label} </div>
      </label>
    </div>
    }
    </>
  );
};

export default Input;
