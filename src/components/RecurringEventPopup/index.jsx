import styles from "./style.module.css";
import React, { useState, useEffect } from "react";
import Input from "../Input";
import Customized from "../Customized";

export default function RecurringEventPopup({
  setNewEventPopup,
  values,
  setValues,
  setReturnType,
  chooseRadio,
  setChooseRadio,
  ...props
}) {
  // const [chooseRadio, setChooseRadio] = useState("חד- פעמי");
  const [custom, setCustom] = useState(false);

  const chooseRadioClick = (e) => {
    if (e.target.value !== "בהתאמה אישית") {
    setChooseRadio(e.target.value);
    setReturnType(chooseRadio);
    }
    if (e.target.value == "בהתאמה אישית") {
      setCustom(true);
      // setNewEventPopup(false)
    } else if (e.target.value == "חד- פעמי") {
      setTimeout(() => {
        setNewEventPopup(false);
      }, 300);
      setValues({
        ...values,
        isRepeated: false,
        repeatType: "disposable",
        personalRepeatType: "",
      });
    } else if (e.target.value == "מדי יום") {
      setTimeout(() => {
        setNewEventPopup(false);
      }, 300);
      setValues({
        ...values,
        isRepeated: true,
        repeatType: "daily",
        personalRepeatType: "",
      });
    } else if (e.target.value == "מדי שבוע") {
      setTimeout(() => {
        setNewEventPopup(false);
      }, 300);
      setValues({ ...values, isRepeated: true, repeatType: "weekly" });
    }
  };

  useEffect(() => {
    setReturnType(chooseRadio);
  }, [chooseRadio]);

  function endDefaultDate(date) {
    const endDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate() - 1
    );
    return endDate;
  }

  return (
    <>
      <div className={styles.container} onClick={() => setNewEventPopup(false)}>
        <div
          className={styles.popup}
          onClick={(event) => event.stopPropagation()}
        >
          <Input
            label="חד- פעמי"
            type="radio"
            name="recurring"
            value="חד- פעמי"
            isChecked={chooseRadio === "חד- פעמי"}
            onChange={chooseRadioClick}
          />
          <Input
            label="מדי יום"
            type="radio"
            name="recurring"
            value="מדי יום"
            isChecked={chooseRadio === "מדי יום"}
            onChange={chooseRadioClick}
          />
          <Input
            label="מדי שבוע"
            type="radio"
            name="recurring"
            value="מדי שבוע"
            isChecked={chooseRadio === "מדי שבוע"}
            onChange={chooseRadioClick}
          />
          <Input
            label="התאמה אישית..."
            type="radio"
            name="recurring"
            value="בהתאמה אישית"
            isChecked={chooseRadio === "בהתאמה אישית"}
            onChange={chooseRadioClick}
            onClick={() => setCustom(true)}
          />
        </div>
      </div>

      {/* <div className={styles.customized}> */}
      {custom && (
        <Customized
          values={values}
          setValues={setValues}
          setCustom={setCustom}
          chooseRadio={chooseRadio}
          setNewEventPopup={setNewEventPopup}
          setReturnType={setReturnType}
          setChooseRadio={setChooseRadio}
        />
      )}
      {/* </div> */}
    </>
  );
}