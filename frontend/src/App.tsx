import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Certifications from "./pages/Certifications";
import Code from "./pages/Code";
import Education from "./pages/Education";
import Experiences from "./pages/Experiences";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import SignUp from "./pages/SignUp";
import Skills from "./pages/Skills";
import Templates from "./pages/Templates";
import VerificationPage from "./pages/VerificationPage";

function App() {

  return (<>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verification" element={<VerificationPage />} />
        {/* <Route path="/logout" element={<Logout />} /> Handle logout logic in a separate component */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="skills" element={<Skills />} />
          <Route path="education" element={<Education />} />
          <Route path="experiences" element={<Experiences />} />
          <Route path="projects" element={<Projects />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="code" element={<Code />} />
          <Route path="templates" element={<Templates />} />
        </Route>
      </Routes>
    </Router>
  </>
  );
}

export default App;
