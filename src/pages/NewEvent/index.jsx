import { useContext, useEffect, useRef, useState } from "react";
import { settingsContext } from "../../layout/Layout";
import ClassicButton from "../../components/ClassicButton copy";
import Input from "../../components/Input";
import SelectIcon from "../../components/SelectIcon";
import styles from "./style.module.css";
import headerContext from "../../context/headerContext";
import apiCalls from "../../function/apiCalls";
import { useNavigate } from "react-router-dom";
import NoRepeatEvent from "../../components/NoRepeatEvent";
import RecurringEventPopup from "../../components/RecurringEventPopup";
import ToggleSwitch from "../../components/ToggleSwitch";
import beginDateUpdate from "../../function/beginDateUpdate";
import popUpContext from "../../context/popUpContext";
import { locations } from "../SearchEvent/translation";
import { timeValidation } from "./timeValidation";
import MultiSelect from "../../components/MultiSelect";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import DateDisplay from "../../components/DateDisplay";

export default function NewEvent({ style = {}, className = "", ...props }) {
  const [fileData, setFileData] = useState([]);
  const [newEventPopup, setNewEventPopup] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isInputFormValid, setIsInputFormValid] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectRequired, setSelectRequired] = useState(false);
  const [isTheSubmitButtonPush, setIsTheSubmitButtonPush] = useState(false);
  const [submittedForDisableButton, setSubmittedForDisableButton] =
    useState(false);
  // if the timeValidationOK is true, then the times are correct - the finish time is bigger than the beginning time, and the event is at least 1 hour.
  const [timeValidationOK, setTimeValidationOK] = useState(true);
  const [timeValidationMessage, setTimeValidationMessage] = useState("");

  const ref = useRef();

  const { setPopUpText, setPopUp, setSaveEventMode } = useContext(popUpContext);

  const handleToggleSwitch = (e) => {
    setChecked(!checked);
    setValues({ ...values, isFree: checked });
  };

  const nav = useNavigate();
  const placeData = locations.map((i) => {
    return { value: i, label: i };
  });
  const [loading, setLoading] = useState(true);

  const paymentData = ["בתשלום", "בחינם"];
  const typeData = [
    "אירוע חד פעמי",
    "אירוע יומי",
    "אירוע שבועי",
    "בהתאמה אישית",
  ];
  const [returnType, setReturnType] = useState("חד פעמי");
  const [chooseRadio, setChooseRadio] = useState("חד- פעמי");
  const [categories, setCategories] = useState([]);
  const [audiences, setAudiences] = useState([]);
  const [constancy, setConstancy] = useState("חד פעמי");
  const settingContext = useContext(settingsContext);
  const { setHeader } = useContext(headerContext);
  setHeader("פרסם אירוע");
  const [values, setValues] = useState({
    eventName: sessionStorage.getItem("eventName"),
    summary: sessionStorage.getItem("summary"),
    advertiserName: sessionStorage.getItem("advertiserName"),
    advertiserTel: sessionStorage.getItem("advertiserTel"),
    advertiserEmail: sessionStorage.getItem("advertiserEmail"),
    isRepeated: false,
    repeatType: "disposable",
    repeatTimes: 1,
    personalRepeatType: "",
    date: "",
    repeatSettingsEnd: "endDate",
    // repeatSettingsRepeatEnd: undefined,
    repeatDateEnd: new Date(),
    repeatTimesEnd: 1,
    beginningTime: !sessionStorage.getItem("beginningTime")
      ? "18:00"
      : sessionStorage.getItem("beginningTime"),
    finishTime: !sessionStorage.getItem("finishTime")
      ? "20:00"
      : sessionStorage.getItem("finishTime"),

    place: sessionStorage.getItem("place"),
    accuratelocation: sessionStorage.getItem("accuratelocation"),
    registrationPageURL: sessionStorage.getItem("registrationPageURL"),
    categories: [{}],
    audiences: [{}],
    isFree: true,
    price: "",
    days: [],
    cardImageURL: "",
    coverImageURL: "",
    gallery: [],
  });

  const inputs = [
    {
      id: 1,
      name: "eventName",
      type: "text",
      // label: "שם האירוע",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      placeholder: "שם האירוע",
      className: "form-control",
      required: true,
    },
    {
      id: 2,
      name: "constancy",
      type: constancy || "חד פעמי",
      className: "form-control",
    },
    {
      id: 3,
      name: "advanced",
      type: "button",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      placeholder: "מתקדם",
      label: "מתקדם",
    },

    {
      id: 4,
      name: "place",
      type: "select",
      label: "מקום",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      placeholder: "בחר מיקום",
      className: "form-control",
      icon: "https://cdn3.iconfinder.com/data/icons/lineo-mobile/100/gps-256.png",
      required: true,
    },
    {
      id: 5,
      name: "accuratelocation",
      type: "text",
      errorMessage: "אוי שכחת למלא כאן את פרטים",
      placeholder: "מיקום מדויק או כתובת",
      className: "form-control",
      required: true,
    },
    {
      id: 6,
      name: "beginningTime",
      type: "time",
      label: "מתי האירוע מתחיל?",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      placeholder: "זמן התחלה",
      className: "form-control",
      required: true,
    },
    {
      id: 51,
      name: "timeValidationOK",
      type: "pTimeValidationOK",
    },
    {
      id: 7,
      name: "finishTime",
      type: "time",
      label: "מתי האירוע מסתיים?",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      placeholder: "זמן סיום",
      className: "form-control",
      required: true,
    },
    {
      id: 8,
      name: "payment",
      type: "toogleSwitch",
      label: "עלות",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      placeholder: "עלות",
      className: "form-control",
      icon: "https://cdn4.iconfinder.com/data/icons/tabler-vol-3/24/currency-shekel-512.png",
      required: true,
    },
    {
      id: 9,
      name: "categories",
      type: "selectIcon",
      label: "קטגוריה",
      errorMessage: "אוי שכחת למלא כאן את פרטים",
      placeholder: "קטגוריה",
      required: true,
    },
    {
      id: 10,
      name: "audiences",
      type: "selectIcon",
      label: "קהל יעד",
      errorMessage: "אוי שכחת למלא כאן את פרטים",
      placeholder: "קהל יעד",
      required: true,
    },
    {
      id: 11,
      name: "summary",
      type: "text",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      placeholder: "תיאור האירוע",
      className: "form-control",
      required: true,
    },
    {
      id: 12,
      name: "registrationPageURL",
      type: "url",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      placeholder: " לינק להרשמה/כרטיסים לאירוע",
      className: "form-control",
    },
    {
      id: 13,
      name: "cardImageURL",
      type: "file",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      instructions: "*מומלץ להעלות תמונה מרובעת 1:1",
      label: "תמונת אירוע",
      accept: "image/*",
      className: "form-control",
      required: true,
    },
    {
      id: 14,
      name: "coverImageURL",
      type: "file",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      className: "form-control",
      instructions: "*מומלץ להעלות תמונה מלבנית 16:9",

      label: "תמונת כיסוי",
      accept: "image/*",
      required: true,
    },
    // {
    //   id: 14,
    //   name: "gallery",
    //   type: "file",
    //   label: "העלה תמונות לגלריה",
    //   multiple: true,
    // accept: "image/*",
    // },

    {
      id: 15,
      name: "advertiserName",
      type: "text",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      className: "form-control",
      placeholder: "שם המפרסם",
      required: true,
    },
    {
      id: 16,
      name: "advertiserTel",
      type: "tel",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      className: "form-control",
      placeholder: "טלפון",
      required: true,
      pattern: "^[0-9]{8,15}$",
    },
    {
      id: 17,
      name: "advertiserEmail",
      type: "email",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      className: "form-control",
      placeholder: "מייל",
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTheSubmitButtonPush(true);
    setSubmittedForDisableButton(true);
    // הכנסת שעת סיום לתאריך ולתאריך סיום
    values.date = beginDateUpdate(values.date, values.finishTime);
    if (values.repeatDateEnd instanceof Date) {
      values.repeatDateEnd = beginDateUpdate(
        values.repeatDateEnd,
        values.finishTime
      );
    }
    const formElement = e.target;
    setIsValid(formElement.checkValidity());
    if (!values.place) setSelectRequired(true);
    formElement.classList.add(styles.submitted);
    const firstInvalidField = formElement.querySelector(":invalid");
    firstInvalidField?.focus();

    if (
      values.eventName &&
      values.summary &&
      values.advertiserName &&
      values.advertiserTel &&
      values.advertiserEmail &&
      values.categories[0] &&
      values.audiences[0] &&
      values.cardImageURL &&
      values.coverImageURL &&
      formElement.checkValidity()
    ) {
      const formData = new FormData();
      for (const key in fileData) {
        if (Array.isArray(fileData[key])) {
          for (const file of fileData[key]) {
            formData.append(key, file);
          }
        } else {
          formData.append(key, fileData[key]);
        }
      }
      formData.append(
        "values",
        JSON.stringify({
          eventName: values.eventName,
          summary: values.summary,
          advertiser: {
            name: values.advertiserName,
            tel: values.advertiserTel,
            email: values.advertiserEmail,
          },
          date: values.date,
          days: values.days,
          beginningTime: values.beginningTime,
          finishTime: values.finishTime,
          place: values.place,
          accuratelocation: values.accuratelocation,
          categories: values.categories,
          audiences: values.audiences,
          registrationPageURL: values.registrationPageURL
            ? `${values.registrationPageURL}/?ref=here_event`
            : null,
          cardImageURL: values.cardImageURL,
          coverImageURL: values.coverImageURL,
          gallery: values.gallery,
          repeatType: values.repeatType,
          personalRepeat: values.personalRepeatType,
          isReapeated: values.isRepeated,
          repeatTimes: values.repeatTimes,
          payment: {
            isFree: values.isFree,
          },
          repeatSettingsPersonal: {
            type: values.repeatSettingsEnd,
            dateEnd: values.repeatDateEnd,
            timesEnd: values.repeatTimesEnd,
          },
        })
      );

      console.log([...formData.entries()]);

      setPopUpText(
        "האירוע שרצית לפרסם נשלח למערכת נודיע לך ברגע שמנהל המערכת יאשר את פרסומו"
      );
      setPopUp(true);
      setSaveEventMode(true);
      nav(`/`);

      apiCalls("post", "/event/createvent", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          if (res._id != "") {
            sessionStorage.clear();
          }
        })
        .catch((err) => {
          setPopUpText(err.response.data);
          setSaveEventMode(true);
          setPopUp(true);
          nav("/newEvent");
        });
    }
  };

  useEffect(() => {
    if (timeValidationMessage !== "") setTimeValidationOK(false);
    else setTimeValidationOK(true);
  }, [timeValidationMessage]);

  useEffect(() => {
    setAudiences(() => [...settingContext.audiences]);
    setCategories(() => [...settingContext.categories]);
  }, [settingContext.audiences, settingContext.categories]);
  // useEffect(() => {}, [values]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    sessionStorage.setItem(e.target.name, e.target.value);
    setSubmittedForDisableButton(false);

    //if the targeted input is the beginningTime or finishingTime then- we make a validation check.
    if (e.target.name === "beginningTime" || e.target.name === "finishTime") {
      //set the beginning and finishing time from the values object
      const beginningTimeObj = new Date("2000-01-01T" + values.beginningTime);
      const finishingTimeObj = new Date("2000-01-01T" + values.finishTime);

      //update the beginningTimeObj or the finishingTimeObj according to the targeted value.
      const [hours, minutes] = e.target.value.split(":");

      if (e.target.name === "beginningTime") {
        beginningTimeObj.setHours(hours);
        beginningTimeObj.setMinutes(minutes);
      } else {
        finishingTimeObj.setHours(hours);
        finishingTimeObj.setMinutes(minutes);
      }
      setTimeValidationMessage(
        timeValidation(beginningTimeObj, finishingTimeObj)
      );
    }
    if (e.target.type === "file")
      setFileData({ ...fileData, [e.target.name]: e.target.files[0] });
  };
  const formattedDate = new Date(values.date).toLocaleDateString("he-IL", {
    weekday: "long",
    timeZone: "UTC",
    numberingSystem: "latn",
  });

  function SubmitButton() {
    if (isInputFormValid && submittedForDisableButton) {
      return (
        <div className={styles.footerBtn}>
          <ClassicButton
            width="100%"
            height={50}
            text={"נשלח לפרסום, אנא המתן"}
            type={"submit"}
            disabled={true}
          />
        </div>
      );
    } else {
      return (
        <div className={styles.button}>
          <ClassicButton
            width="100%"
            text={"שמור"}
            height={50}
            type={"submit"}
          />
        </div>
      );
    }
  }

  return (
    <div
      dir="RTL"
      className={`${styles.main} ${className}`}
      style={style}
      {...props}
    >
      <div className={styles.title}>
        כמה פרטים כדי שנוכל לפרסם את האירוע שלך
      </div>{" "}
      <form
        key={1}
        onSubmit={handleSubmit}
        noValidate
        className={styles.form}
        encType="multipart/form-data"
      >
        {inputs.map((input) => {
          if (input.type === "select")
            return (
              <MultiSelect
                errorMessage={input.errorMessage}
                key={input.id}
                placeholder={input.placeholder}
                value={values[input.name]}
                name={input.name}
                values={values}
                saveToSession={"place"}
                setValues={setValues}
                isValid={isValid}
                selectRequired={selectRequired}
                setSelectRequired={setSelectRequired}
                isTheSubmitButtonPush={isTheSubmitButtonPush}
                setIsTheSubmitButtonPush={setIsTheSubmitButtonPush}
                options={input.name === "repeatType" ? typeData : placeData}
                {...input}
              />
            );
          else if (input.type === "selectIcon") {
            return (
              <div>
                <SelectIcon
                  isValid={isValid}
                  errorMessage={input.errorMessage}
                  inText={false}
                  header={input.label}
                  key={input.id}
                  value={values[input.name]}
                  name={input.name}
                  values={values}
                  setValues={setValues}
                  isTheSubmitButtonPush={isTheSubmitButtonPush}
                  array={input.name === "categories" ? categories : audiences}
                  setArray={
                    input.name === "categories" ? setCategories : setAudiences
                  }
                  {...input}
                />
              </div>
            );
          } else if (input.type === "חד פעמי")
            return (
              <div className={styles.date}>
                {" "}
                <NoRepeatEvent values={values} setValues={setValues} />
              </div>
            );
          else if (input.type == "pTimeValidationOK")
            return (
              <p className={styles.errorMessage}>{timeValidationMessage}</p>
            );
          else if (input.type === "button")
            return (
              <div
                className={styles.advanced}
                onClick={() => setNewEventPopup(true)}
              >
                <DateDisplay returnType={returnType} values={values} />
              </div>
            );
          else if (input.type == "toogleSwitch")
            return (
              <div className={styles.dateLoction}>
                <ToggleSwitch
                  text="בתשלום"
                  checked={checked}
                  onChange={handleToggleSwitch}
                  className={input.className}
                />
              </div>
            );
          else
            return (
              <Input
                key={input.id}
                errorMessage={input.errorMessage}
                instructions={input.instructions}
                value={values[input.name]}
                onChange={onChange}
                isValid={isValid}
                className={input.className}
                type={input.type}
                width={"240px"}
                {...input}
              />
            );
        })}

        {newEventPopup && (
          <RecurringEventPopup
            setNewEventPopup={setNewEventPopup}
            values={values}
            setValues={setValues}
            setReturnType={setReturnType}
            chooseRadio={chooseRadio}
            setChooseRadio={setChooseRadio}
          />
        )}

        <SubmitButton />
      </form>
    </div>
  );
}
