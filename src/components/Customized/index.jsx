import styles from "./style.module.css";
import { useState, useEffect } from "react";
import Input from "../Input";
import DateInput from "../DateInput";
import ClassicButton from "../ClassicButton copy";
import SelectDays from "../SelectDays";
import { FiRotateCw } from "react-icons/fi";

//personalRepeatType, repeatSettingsEnd, repeatSettingsRepeatEnd,     days: [{}],

export default function Customized({
  values,
  setValues = () => {},
  setCustom,
  chooseRadio,
  setNewEventPopup,
  setReturnType,
  setChooseRadio,
  ...props
}) {
  const [chooseDayOrWeek, setChooseDayOrWeek] = useState("weeks");
  const [numberTimes, setNumberTimes] = useState(1);
  const [chooseDays, setChooseDays] = useState([]);
  const [arrayDay, setArrayDay] = useState([]);
  const [repeatSettingsEnd, setRepeatSettingsEnd] = useState("endDate");
  const [repeatDateEnd, setRepeatDateEnd] = useState({});
  const [repeatTimesEnd, setRepeatTimesEnd] = useState(1);

  const [clickDay, setClickDay] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const [isChoosen, setIsChoosen] = useState("endDate");

  useEffect(() => {
    if (chooseDays.find((dayName) => dayName.day == clickDay.day)) {
      // chooseDays.includes(clickDay)?
      setChooseDays(chooseDays.filter((day) => day.day !== clickDay.day));
    } else {
      setChooseDays([...chooseDays, clickDay]);
    }
  }, [isClicked]);

  function saveClick() {
    setReturnType("בהתאמה אישית")
    setChooseRadio("בהתאמה אישית")
    setValues({
      ...values,
      isRepeated: true,
      repeatType: "customized",
      repeatTimes: numberTimes,
      personalRepeatType: chooseDayOrWeek,
      //  days: arrayDay,
      //  daysObjects: chooseDays,
      days: chooseDays,
      repeatSettingsEnd: repeatSettingsEnd,
      repeatDateEnd: repeatDateEnd || new Date(),
      repeatTimesEnd: repeatTimesEnd || 1,
    });
    setCustom(false);
    setNewEventPopup(false);
  }

  function cancelClick(){
    setCustom(false)
    setNewEventPopup(false)
  }

  function repeatClick() {
    setRepeatSettingsEnd("endNumTimes");
    setIsChoosen("endTimes");
  }

  const days = [
    { value: "א", nameDay: "ראשון", day: 0 },
    { value: "ב", nameDay: "שני", day: 1 },
    { value: "ג", nameDay: "שלישי", day: 2 },
    { value: "ד", nameDay: "רביעי", day: 3 },
    { value: "ה", nameDay: "חמישי", day: 4 },
    { value: "ו", nameDay: "שישי", day: 5 },
    { value: "ש", nameDay: "שבת", day: 6 },
  ];

  return (
    <div className={styles.container} onClick={cancelClick}>
      <div
        className={styles.definitions}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <FiRotateCw /> תדירות מותאמת אישית{" "}
        </div>
        <div className={styles.back}>חזרה כל</div>

        <div className={styles.numTypeReturn}>
          <div className={styles.number}>
            {chooseDayOrWeek === "weeks" && (
              <input
                type="number"
                min="1"
                max="2"
                onInput={(e) => setNumberTimes(e.target.value)}
              />
            )}
          </div>

          <div className={styles.number}>
            {chooseDayOrWeek === "days" && (
              <input
                type="number"
                min="1"
                max="31"
                onInput={(e) => setNumberTimes(e.target.value)}
              />
            )}
          </div>

          <span className={styles.select}>
            <select onChange={(e) => setChooseDayOrWeek(e.target.value)}>
              <option value="weeks">שבועות</option>
              <option value="days">ימים</option>
            </select>
          </span>
        </div>
        {chooseDayOrWeek === "weeks" && (
          <div className={styles.dayReturn}>
            <div className={styles.back}>חזרה בימים</div>
            <div className={styles.days_div}>
              {days.map((day) => (
                <div className={styles.dayRound}>
                  <SelectDays
                    days={day}
                    setClickDay={setClickDay}
                    isClicked={isClicked}
                    setIsClicked={setIsClicked}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {chooseDayOrWeek === "days" && (
          <div className={styles.dayReturn}>
            <br />
          </div>
        )}

        <div className={styles.end}>
          <div className={styles.back}>סיום</div>
          <div
            className={styles.endDateInputs}
            onClick={() => setIsChoosen("endDate")}
          >
            <div className={styles.inDate}>
              <Input
                onChange={() => setRepeatSettingsEnd("endDate")}
                // label="ב-"
                type="radio"
                name="repeatEnd"
                value="endDate"
                isChecked={isChoosen == "endDate"}
              />
            </div>
            <span className={styles.endTyps}>ב-</span>
            <span className={styles.chooseDate}>
              {" "}
              <DateInput
                values={repeatDateEnd}
                setValues={setRepeatDateEnd}
                minDate={values.date}
                maxDate={
                  new Date(
                    values.date.getFullYear(),
                    values.date.getMonth() + 1,
                    values.date.getDate() - 1
                  )
                }
                classNameStyle={"customized"}
                datepickerStyle={true}
                startDate={values.date}
              />
            </span>
          </div>

          <div className={styles.numberEnd}>
            <div className={styles.after}>
              <Input
                onChange={repeatClick}
                // label="אחרי"
                type="radio"
                name="repeatEnd"
                value="endNumber"
                isChecked={isChoosen == "endTimes"}
              />
            </div>
            <div className={styles.repeatTimes} onClick={repeatClick}>
              <span className={styles.after}>אחרי</span>
              {chooseDayOrWeek === "weeks" && (
                <div className={styles.number}>
                  <input
                    type="number"
                    onInput={(e) => setRepeatTimesEnd(e.target.value)}
                    min="1"
                    max="4"
                  />
                  <span className={styles.endTyps}>חזרות</span>
                </div>
              )}
              {chooseDayOrWeek === "days" && (
                <div className={styles.number}>
                  <input
                    type="number"
                    onInput={(e) => setRepeatTimesEnd(e.target.value)}
                    min="1"
                    max="31"
                  />
                  <span className={styles.endTyps}>חזרות</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.buttons}>
            <div className={styles.endButton}>
              <ClassicButton text="סיים" width="100%" func={saveClick} />
            </div>
            <div className={styles.endButton}>
              <ClassicButton
                text="ביטול"
                width="100%"
                backgroundColor="white"
                color="black"
                border="1px solid black"
                func={cancelClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}