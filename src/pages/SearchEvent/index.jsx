import { useContext, useState, useEffect } from "react";
import headerContext from "../../context/headerContext";
import { locations, translation } from "./translation";
import style from "./style.module.css";
import ClassicButton from "../../components/ClassicButton copy";
import RoundButton from "../../components/RoundButton";
import DateInput from "../../components/DateInput";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
// import { settingsContext } from "../../layout/Layout";
import Select from "../../components/Select";
import { ImLocation } from "react-icons/im";
// import beginDateUpdate from "../../function/beginDateUpdate";

export default function SearchEvent({categories, setCategories ,audiences, setAudiences ,location, setLocation, btnDates, setBtnDates, loading}) {

  const [date, setDate] = useState(new Date());
  
  // const settingContext = useContext(settingsContext);
  const { setHeader } = useContext(headerContext);

  setHeader(translation.advencedSearch);



function clickCategory(e) {
  setCategories((prev) =>
    prev.map((v, i) =>
      i == e.target.id
        ? (console.log(e.target), { ...v, isActive: !v.isActive })
        : v
        )
        );
      }

function handleTodayTomorrwBtn(e) {
        if (e.target.name === "today") {
          setDate(() => new Date());
          return;
        }
    
        setDate(() => new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
}

function handleThisWeekBtn() {
  setBtnDates((prev) => {
    let newBtnDates = { ...prev };
    Object.keys(prev).forEach((v) => (newBtnDates[v] = false));
    newBtnDates.thisWeek = true;
    return newBtnDates;
  });
}

function handleSubmit(){console.log("click")}

useEffect(() => {
  if (date.toLocaleDateString() === new Date().toLocaleDateString())
    setBtnDates((prev) => {
      let newBtnDates = { ...prev };
      Object.keys(prev).forEach((v) => (newBtnDates[v] = false));
      newBtnDates.today = true;
      return newBtnDates;
    });
  else if (
    date.toLocaleDateString() ===
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleDateString()
  )
    setBtnDates((prev) => {
      let newBtnDates = { ...prev };
      Object.keys(prev).forEach((v) => (newBtnDates[v] = false));
      newBtnDates.tomorrow = true;
      return newBtnDates;
    });
  else {
    setBtnDates(() => ({ today: false, tomorrow: false, thisWeek: false }));
  }
}, [date]);

function clickAudience(e) {
        setAudiences((prev) =>
        prev.map((v, i) =>
        i == e.target.id ? { ...v, isActive: !v.isActive } : v
        )
        )
      }

  return (
    <div>
      {/* {console.log(categories,"categories")}
      {console.log(audiences)}
      {console.log(location)}
      {console.log(btnDates)} */}
      <div className={style.content}>
        <div className={style.section}>
          <span className={style.title}>{translation.category}</span>
          <div className={style.categories}>
            {!loading ? (
              categories.map((category, i) => (
                <RoundButton
                  text={translation[category.name]}
                  icon={category.icon}
                  func={clickCategory}
                  id={i}
                  isActive={category.isActive}
                />
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>

        <div className={style.section}>
          <span className={style.title}>{translation.audience}</span>
          <div className={style.audiences}>
            {!loading ? (
              audiences.map((audience, i) => (
                <RoundButton
                  text={translation[audience.name]}
                  icon={audience.icon}
                  id={i}
                  func={clickAudience}
                  isActive={audience.isActive}
                />
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>

        <div className={style.section}>
          <span className={style.title}>{translation.location}</span>
          <div className={style.location}>
            {
              <Select
                placeholder={location||"בחר מיקום"}
                choossArray={locations}
                func={setLocation}
                icon="https://cdn-icons-png.flaticon.com/512/2838/2838912.png"
              />
            }
          </div>
        </div>

        <div className={style.section}>
          <span className={style.title}>{translation.date}</span>
          <div className={style.dateBtnSelection}>
            <ClassicButton
              width={100}
              text={translation.today}
              isActive={btnDates.today}
              name="today"
              func={handleTodayTomorrwBtn}
              oppositeColor
            />
            <ClassicButton
              width={100}
              text={translation.tomorrow}
              isActive={btnDates.tomorrow}
              name="tomorrow"
              func={handleTodayTomorrwBtn}
              oppositeColor
            />
            <ClassicButton
              width={100}
              text={translation.thisWeek}
              isActive={btnDates.thisWeek}
              func={handleThisWeekBtn}
              oppositeColor
              />
          </div>
          {/* <DateInput func={handleSelectDate} val={date} /> */}
        </div>

        <div className={style.footerBtn}>
          <ClassicButton
            width={300}
            text={translation.search}
            func={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}


// const navigate = useNavigate();
















// // function handleSelectDate(date) {
// //   setDate(() => date);
// //   if (btnDates.thisWeek)
// //     setBtnDates((prev) => ({ ...prev, thisWeek: false }));
// // }

// function handleSubmit() {
//   let startDateQuery =  beginDateUpdate(date)
//   let endDateQuery = beginDateUpdate(date,"23:59")

//   let endDayOfWeek = "";

//   if (btnDates.thisWeek) {
//     let today = new Date().getDay();
//     if (today === 7) {
//       endDayOfWeek = new Date(date.getTime() + 6 * 24 * 60 ** 2 * 1000)
//         .toLocaleString()
//         .split(" ");
//       endDayOfWeek[1] = "23:59:59";
//       endDayOfWeek = endDayOfWeek.join(" ");
//     } else if (today === 6) {
//       endDayOfWeek = endDateQuery;
//     } else {
//       endDayOfWeek = new Date(
//         date.getTime() + (6 - today) * 24 * 60 ** 2 * 1000
//       )
//         .toLocaleString()
//         .split(" ");
//       endDayOfWeek[1] = "23:59:59";
//       endDayOfWeek = endDayOfWeek.join(" ");
//     }
//   }

//   let dbQuery = {
//        date: { $gte: startDateQuery } ,
//        date: {$lte: endDayOfWeek? new Date(endDayOfWeek): new Date(endDateQuery)}
//       };

//   let activeCategories = categories.filter((category) => category.isActive);
//   let activeAudiences = audiences.filter((audience) => audience.isActive);

//   if (activeCategories.length >= 2) {
//     dbQuery.category = { $in: [] };
//     activeCategories.forEach((category) =>
//       dbQuery.category.$in.push(category._id)
//     );
//   } else if (activeCategories.length) {
//     dbQuery.category = { $in: [activeCategories[0]._id] };
//   }

//   if (activeAudiences.length >= 2) {
//     dbQuery.targetAudience = { $in: [] };
//     activeAudiences.forEach((audience) =>
//       dbQuery.targetAudience.$in.push(audience._id)
//     );
//   } else if (activeAudiences.length) {
//     dbQuery.targetAudience = { $in: [activeAudiences[0]._id] };
//   }
// console.log(dbQuery,"dbQuery");
//   let query = JSON.stringify(dbQuery);
//   const encodedQueryString = encodeURIComponent(query);

//   navigate(`/searchEvent/result/${encodedQueryString}`);
// }

// function useBackBtn() {
//   navigate(-1);
// }
