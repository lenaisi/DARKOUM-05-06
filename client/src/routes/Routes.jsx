// AppRoutes.jsx
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignInForm from "../pages/auth/SignInForm.jsx";
import SignUpForm from "../pages/auth/SignUpForm";
import LandingPage from "../pages/LandingPage.jsx";
import Home from "../pages/Home.jsx";
import NosServices from "../pages/NosServices.jsx";
import AboutUs from "../pages/AboutUs.jsx";
import Logout from "../pages/auth/logout.jsx";
import Search from "../pages/search";
import PasswordResetForm from "../pages/PasswordResetForm";
import CodeVerificationForm from "../pages/CodeVerificationForm";
import NewPassword from "../pages/NewPassword";
import VisiteForm from "../pages/VisitForm";
import Confirmation from "../pages/Confirmation";
import Users from "../pages/user";
import DemandeVisit from "../pages/DemandeVisit";
import OurHomes from "../pages/OurHomes";
import AdminAccueil from "../pages/AdminAccueil.jsx";
import AddHomes from "../pages/AddHomes.jsx";
import AdminLogin from "../pages/auth/Adminlogin.jsx";
import HouseDetails from "../pages/HouseDetails.jsx";
import SearchResults from "../pages/SearchResults.jsx";
import CompteErreur from "../pages/erreurPage";
import MyFavorites from "../pages/MyFavorites.jsx";
import Avis from "../pages/Avis.jsx";

const AppRoutes = () => {
  const { currentUser } = useSelector((state) => state.user);
  const userId =currentUser?.userId;

  console.log("currentUser:", currentUser);

  return (
    <Router>
      <Routes>
        <Route path="/index.html" element={<Navigate to="/" />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/ResetPassword" element={<PasswordResetForm />} />
        <Route path="/Verification" element={<CodeVerificationForm />} />
        <Route path="/NewPassword/:id/:token" element={<NewPassword />} />
        <Route path="/Adminlogin" element={<AdminLogin />} />
        <Route path="/home" element={<Home userId={userId} />} />
        <Route path="/NosServices" element={<NosServices />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Search" element={<Search userId={userId} />} />
        <Route path="/myFavorites" element={<MyFavorites userId={userId} />} />
        <Route path="/visit" element={<VisiteForm />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/users" element={<Users />} />
        <Route path="/DemandeVisit" element={<DemandeVisit />} />
        <Route path="/OurHomes" element={<OurHomes />} />
        <Route path="/Avis" element={<Avis userId={userId} />} />
        <Route path="/Admin" element={<AdminAccueil />} />
        <Route path="/AddHomes" element={<AddHomes />} />
        <Route path="/HouseDetails/:id" element={<HouseDetails />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/erreur" element={<CompteErreur />} />
        <Route path="http://localhost:5000/auth/google" />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
