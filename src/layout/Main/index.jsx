import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../../pages/Home";
import NewEvent from "../../pages/NewEvent";
import NewNewEvent from "../../pages/NewNewEvent";
import SearchEvent from "../../pages/SearchEvent";
import ViewEvent from "../../pages/ViewEvent";
import SearchResult from "../../pages/SearchResult";
import Login from "../../pages/Login";
import Registeretion from "../../pages/Registeretion";
import Test from "../../pages/Test";
import ResetPassword from "../../components/ResetPassword";
import ForgetPassword from "../../components/ForgetPassword";
import { useState } from "react";
import apiCalls from "../../function/apiCalls";
import GoogleRegister from "../../pages/GoogleRegister";


function Main() {

  const [search, setSearch] = useState({
    categories: [],
    audiences: [],
    location: "",
    btnDates: "",
  });

  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registeretion" element={<Registeretion />} />

        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/googleRegister" element={<GoogleRegister />} />
        <Route
          path="/searchEvent"
          element={<SearchEvent setSearch={setSearch} />}
        />
        <Route
          path="/searchEvent/result"
          element={<SearchResult search={search} />}
        />

        <Route path="/viewEvent/:event" element={<ViewEvent />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/newNewEvent" element={<NewNewEvent />} />
        {localStorage.Token && <Route path="/newEvent" element={<NewEvent />} />}
      </Routes>
    </main>
  );
}
export default Main;
