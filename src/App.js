// App.js
import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import PrivateRoute from "./PrivateRoute";
import UploadMarkAdmin from "./pages/FileUpload";
import FileUpload from "./pages/FileUpload";
import Student_Home from "./pages/Student_Home";
import UploadQuestion from "./pages/uploadQuestion"; 
import PracticeQuestion from "./pages/PracticeQuestion"; 
import ViewSubmission from "./pages/ViewSubmissions"
import PrivateRouteStudent from "./PrivateRouteStudent";
import PrivateRouteAdmin from "./PrivateRouteAdmin";
import OtpVerificationPage from "./pages/OtpVerificationPage";
import AdminPage from "./pages/AdminPage";





function App() {
  return (
    <Router>
      <Routes>
      <Route path="/pd" element={<Signin />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/upload-mark-admin" element={<PrivateRoute element={<FileUpload />}/>} />
        <Route path="/upload-question" element={<PrivateRoute element={<UploadQuestion />}/>} /> 
        <Route path="/view-student-submissions" element={<PrivateRoute element={<ViewSubmission /> }/>} />
        <Route path="/practice-questions" element={<PrivateRouteStudent element={<PracticeQuestion />} />} /> 
        <Route path="/practice-questions/:subject" element={<PrivateRouteStudent element={<PracticeQuestion />} />} />
        <Route path="/student-home" element={<PrivateRouteStudent element={<Student_Home />} />} />
        <Route path="/admin-otp-verification" element={<PrivateRouteAdmin element={<OtpVerificationPage />} />} />
        <Route path="/admin-home" element={<PrivateRouteAdmin element={<AdminPage />} />} />








        <Route path="*" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
