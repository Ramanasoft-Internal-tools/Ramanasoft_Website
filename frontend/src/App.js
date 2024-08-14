// import './App.css';
// import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { toast } from 'react-toastify';
// import HRRegistrationForm from './components/register/hr_Reg/hr_register';
// import InternRegistration from './components/register/intern_Reg/intern_reg';
// import SADash from './components/SuperAdmin/Dashboard/SA_Dashboard';
// import LoginSelector from './components/Home/loginselector';
// import Home from './components/Home/components/Home';
// import HRLogin from './components/Home/components/HRLogin';
// import SuperAdminLogin from './components/Home/components/SALogin';
// import InternLogin from './components/Home/components/InternLogin';
// import InternDash from './components/Intern/Intern_Dashboard';
// import HrPortal from './components/HR/HRDashboard/HrDashboard';
// import AddHr from './components/HR/JobStatus/AddHr';
// import SAStudentsPlaced from './components/SuperAdmin/home/SAStudentsPlaced';
// import SAStudentsApplied from './components/SuperAdmin/home/SA_StudentsApplied';
// import 'react-toastify/dist/ReactToastify.css';
// import CompanyData from './components/HR/CompanyData';
// import StudentDetails from './components/HR/StudentData';
// import HrJobDesc from './components/HR/HrJobDesc';
// import PostJobs from './components/HR/HrPostJobs/HrPostJobs';
// import ProfilePage from './components/HR/HrProfile/HrProfile';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import RegistrationRequests from './components/HR/RegistrationRequests/RegistrationRequests';
// import HrViewJobs from './components/HR/HrViewJobs/HrViewJobs';
// import HrPastJobs from './components/HR/HrPastJobs/HrPastJobs';
// import StudentsApplied from './components/HR/StudentsApplied';
// import StudentsPlaced from './components/HR/StudentsPlaced';
// import HrLeads from './components/HR/JobStatus/HrLeads';
// import JdReceived from './components/HR/JobStatus/JdReceived';
// import JobStatus from './components/HR/JobStatus/JobStatus';
// import SAJobDesc from './components/SuperAdmin/SAViewJobs/SAJobDesc';
// import QuizDash from './components/HR/Quiz/Admin/quiz/quizdash';
// import CreateDash from './components/HR/Quiz/Admin/quiz/QuizCreate/CreateDash';
// import QuizAttempt from './components/Intern/quiz/QuizAttempt';
// import UserQuizAnalysis from './components/Intern/quiz/userAnalyze';
// import PreviewQuiz from './components/HR/Quiz/Admin/quiz/preview/preview';
// function PrivateRoute({ element }) {
//   const isVerified = Cookies.get('verified') === 'true';
//   if (!isVerified) {
//     toast.error("Login to continue");
//     return <Navigate to="/" />;
//   }
//   return element;
// }
// function App() {
//   return (
//     <div className=''>
//       <BrowserRouter>
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/about' element={<Home defaultTab="about" />} />
//           <Route path='/hr_reg' element={<HRRegistrationForm />} />
//           <Route path='/hr_login' element={<HRLogin />} />
//           <Route path='/superadmin_login' element={<SuperAdminLogin />} />
//           <Route path='/intern_login' element={<InternLogin />} />
//           <Route path='/intern_reg' element={<InternRegistration />} />
//           <Route path='/login' element={<LoginSelector />} />
//           <Route path="/quiz/:user_id/:token" element={<QuizAttempt />} />
//           <Route path='/preview/:token' element={<PreviewQuiz />} />
//           <Route path='/quiz-analysis/:userId/:quizToken' element={<UserQuizAnalysis />} />

//           <Route path='/intern_dash/*' element={<PrivateRoute element={<InternDash />} />} />
//           <Route path='/SA_dash/*' element={<PrivateRoute element={<SADash />} />} />
//           <Route path='/hr-dashboard/*' element={<PrivateRoute element={<HrPortal />} />} />

//           <Route path="/hr-dashboard/post-jobs" element={<PrivateRoute element={<PostJobs />} />} />
//           <Route path="/hr-dashboard/past-jobs" element={<PrivateRoute element={<HrPastJobs />} />} />
//           <Route path="/hr-dashboard/registration-requests" element={<PrivateRoute element={<RegistrationRequests />} />} />
//           <Route path="/hr-dashboard/view-jobs" element={<PrivateRoute element={<HrViewJobs />} />} />
//           <Route path="/hr-dashboard/students-applied" element={<PrivateRoute element={<StudentsApplied />} />} />
//           <Route path="/hr-dashboard/students/:status" element={<PrivateRoute element={<StudentsPlaced />} />} />
//           <Route path="/hr-dashboard/hr-leads" element={<PrivateRoute element={<HrLeads />} />} />
//           <Route path='/hr-dashboard/profile' element={<PrivateRoute element={<ProfilePage />} />} />
//           <Route path="/hr-dashboard/jd-received" element={<PrivateRoute element={<JdReceived />} />} />
//           <Route path="/hr-dashboard/companies/:status" element={<PrivateRoute element={<JobStatus />} />} />
//           <Route path="/student/:candidateID" element={<PrivateRoute element={<StudentDetails />} />} />
//           <Route path="/companies/:companyID" element={<PrivateRoute element={<CompanyData />} />} />
//           <Route path='/hr-dashboard/job/:jobId' element={<PrivateRoute element={<HrJobDesc />} />} />

//           <Route path='/SA_dash/job/:jobId' element={<PrivateRoute element={<SAJobDesc />} />} />
//           <Route path='/sa-dashboard/students-applied' element={<PrivateRoute element={<SAStudentsApplied />} />} />
//           <Route path='/sa-dashboard/students/:status' element={<PrivateRoute element={<SAStudentsPlaced />} />} />
//           <Route path='/sa-dashboard/hr-leads' element={<PrivateRoute element={<HrLeads />} />} />
//           <Route path='/sa-dashboard/jd-received' element={<PrivateRoute element={<JdReceived />} />} />
//           <Route path='/sa-dashboard/companies/:status' element={<PrivateRoute element={<JobStatus />} />} />

//           <Route path="/hr-dashboard/quiz" element={<PrivateRoute element={<QuizDash />} />} />
//           <Route path='/edit/create/:token' element={<PrivateRoute element={<CreateDash defaultTab="Create" />} />} />
//           <Route path='/edit/configure/:token' element={<PrivateRoute element={<CreateDash defaultTab="Configure" />} />} />
//           <Route path='/edit/publish/:token' element={<PrivateRoute element={<CreateDash defaultTab="Publish" />} />} />
//           <Route path='/edit/preview/:token' element={<PrivateRoute element={<CreateDash defaultTab="Preview" />} />} />
//           <Route path='/edit/analyze/:token' element={<PrivateRoute element={<CreateDash defaultTab="Analyze" />} />} />
//         </Routes>
//       </BrowserRouter>
//       <ToastContainer autoClose={5000} />
//     </div>
//   );
// }

// export default App;



import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import HRRegistrationForm from './components/register/hr_Reg/hr_register';
import InternRegistration from './components/register/intern_Reg/intern_reg';
import SADash from './components/SuperAdmin/Dashboard/SA_Dashboard';
import LoginSelector from './components/Home/loginselector';
import Home from './components/Home/components/Home';
import HRLogin from './components/Home/components/HRLogin';
import SuperAdminLogin from './components/Home/components/SALogin';
import InternLogin from './components/Home/components/InternLogin';
import InternDash from './components/Intern/Intern_Dashboard';
import HrPortal from './components/HR/HRDashboard/HrDashboard';
import AddHr from './components/HR/JobStatus/AddHr';
import SAStudentsPlaced from './components/SuperAdmin/home/SAStudentsPlaced';
import SAStudentsApplied from './components/SuperAdmin/home/SA_StudentsApplied';
import 'react-toastify/dist/ReactToastify.css';
import CompanyData from './components/HR/CompanyData';
import StudentDetails from './components/HR/StudentData';
import HrJobDesc from './components/HR/HrJobDesc';
import PostJobs from './components/HR/HrPostJobs/HrPostJobs';
import ProfilePage from './components/HR/HrProfile/HrProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationRequests from './components/HR/RegistrationRequests/RegistrationRequests';
import HrViewJobs from './components/HR/HrViewJobs/HrViewJobs';
import HrPastJobs from './components/HR/HrPastJobs/HrPastJobs';
import StudentsApplied from './components/HR/StudentsApplied';
import StudentsPlaced from './components/HR/StudentsPlaced';
import HrLeads from './components/HR/JobStatus/HrLeads';
import JdReceived from './components/HR/JobStatus/JdReceived';
import JobStatus from './components/HR/JobStatus/JobStatus';
import SAJobDesc from './components/SuperAdmin/SAViewJobs/SAJobDesc';
import QuizDash from './components/HR/Quiz/Admin/quiz/quizdash';
import CreateDash from './components/HR/Quiz/Admin/quiz/QuizCreate/CreateDash';
import QuizAttempt from './components/Intern/quiz/QuizAttempt';
import UserQuizAnalysis from './components/Intern/quiz/userAnalyze';
import PreviewQuiz from './components/HR/Quiz/Admin/quiz/preview/preview';
import QuizResults from './components/HR/Quiz/Admin/results'
function PrivateRoute({ role, element }) {
  const userRole = Cookies.get('role');
  const verified = Cookies.get('verified');
  if (verified === 'true' && userRole === role) {
    return element;
  }

  return( 
  <Navigate to="/" />);
}

function App() {
  return (
    <div className=''>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<Home defaultTab="about" />} />
          <Route path='/hr_reg' element={<HRRegistrationForm />} />
          <Route path='/hr_login' element={<HRLogin />} />
          <Route path='/superadmin_login' element={<SuperAdminLogin />} />
          <Route path='/intern_login' element={<InternLogin />} />
          <Route path='/intern_reg' element={<InternRegistration />} />
          <Route path='/login' element={<LoginSelector />} />
          <Route path="/quiz/:user_id/:token" element={<QuizAttempt />} />
          <Route path='/preview/:token' element={<PreviewQuiz />} />
          <Route path='/preview/:token' element={<PreviewQuiz />} />
          <Route path="/results/:quizToken/:userId" element={<QuizResults />} />
          <Route path='/quiz-analysis/:userId/:quizToken' element={<UserQuizAnalysis />} />
          <Route path='/intern_dash/*' element={<PrivateRoute role="intern"  element={<InternDash />} />} />
          <Route path='/SA_dash/*' element={<PrivateRoute role="SA" element={<SADash />} />} />
          <Route path='/hr-dashboard/*' element={<PrivateRoute role="HR" element={<HrPortal />} />} />

          <Route path="/hr-dashboard/post-jobs" element={<PrivateRoute role="HR" element={<PostJobs />} />} />
          <Route path="/hr-dashboard/past-jobs" element={<PrivateRoute role="HR" element={<HrPastJobs />} />} />
          <Route path="/hr-dashboard/registration-requests" element={<PrivateRoute role="HR" element={<RegistrationRequests />} />} />
          <Route path="/hr-dashboard/view-jobs" element={<PrivateRoute role="HR" element={<HrViewJobs />} />} />
          <Route path="/hr-dashboard/students-applied" element={<PrivateRoute role="HR" element={<StudentsApplied />} />} />
          <Route path="/hr-dashboard/students/:status" element={<PrivateRoute role="HR" element={<StudentsPlaced />} />} />
          <Route path="/hr-dashboard/hr-leads" element={<PrivateRoute role="HR" element={<HrLeads />} />} />
          <Route path='/hr-dashboard/profile' element={<PrivateRoute role="HR" element={<ProfilePage />} />} />
          <Route path="/hr-dashboard/jd-received" element={<PrivateRoute role="HR" element={<JdReceived />} />} />
          <Route path="/hr-dashboard/companies/:status" element={<PrivateRoute role="HR" element={<JobStatus />} />} />
          <Route path="/student/:candidateID" element={<PrivateRoute role="HR" element={<StudentDetails />} />} />
          <Route path="/companies/:companyID" element={<PrivateRoute role="HR" element={<CompanyData />} />} />
          <Route path='/hr-dashboard/job/:jobId' element={<PrivateRoute role="HR" element={<HrJobDesc />} />} />

          <Route path='/SA_dash/job/:jobId' element={<PrivateRoute role="SA" element={<SAJobDesc />} />} />
          <Route path='/sa-dashboard/students-applied' element={<PrivateRoute role="SA" element={<SAStudentsApplied />} />} />
          <Route path='/sa-dashboard/students/:status' element={<PrivateRoute role="SA" element={<SAStudentsPlaced />} />} />
          <Route path='/sa-dashboard/hr-leads' element={<PrivateRoute role="SA" element={<HrLeads />} />} />
          <Route path='/sa-dashboard/jd-received' element={<PrivateRoute role="SA" element={<JdReceived />} />} />
          <Route path='/sa-dashboard/companies/:status' element={<PrivateRoute role="SA" element={<JobStatus />} />} />

          <Route path="/hr-dashboard/quiz" element={<PrivateRoute role="HR" element={<QuizDash />} />} />
          <Route path='/edit/create/:token' element={<PrivateRoute role="HR" element={<CreateDash defaultTab="Create" />} />} />
          <Route path='/edit/configure/:token' element={<PrivateRoute role="HR" element={<CreateDash defaultTab="Configure" />} />} />
          <Route path='/edit/publish/:token' element={<PrivateRoute role="HR" element={<CreateDash defaultTab="Publish" />} />} />
          <Route path='/edit/preview/:token' element={<PrivateRoute role="HR" element={<CreateDash defaultTab="Preview" />} />} />
          <Route path='/edit/analyze/:token' element={<PrivateRoute role="HR" element={<CreateDash defaultTab="Analyze" />} />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={5000} />
    </div>
  );
}

export default App;
