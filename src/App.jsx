import { Routes, Route } from 'react-router';
import './App.css';
import HomePage from './pages/landing-page/HomePage';
import RegisterPage from './pages/auth-page/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/auth-page/LoginPage';
import AboutUsPage from './pages/landing-page/AboutUsPage';
import DashboardHomePage from './pages/dashboard/DashboardHomePage';
import ProtectedRoute from './components/middleware/ProtectedRoute';
import RedirectIfAuthenticated from './components/middleware/RedirectIfAuthenticated';
import DashboardResultsPage from './pages/dashboard/DashboardResultsPage';
import DashboardProfilePage from './pages/dashboard/DashboardProfilePage';
import DashboardScanEyePage from './pages/dashboard/DashboardScanEyePage';

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <RedirectIfAuthenticated>
              <HomePage />
            </RedirectIfAuthenticated>
          }
        />

        <Route
          path='/about-us'
          element={
            <RedirectIfAuthenticated>
              <AboutUsPage />
            </RedirectIfAuthenticated>
          }
        />

        <Route
          path='/login'
          element={
            <RedirectIfAuthenticated>
              <LoginPage />
            </RedirectIfAuthenticated>
          }
        />

        <Route
          path='/register'
          element={
            <RedirectIfAuthenticated>
              <RegisterPage />
            </RedirectIfAuthenticated>
          }
        />

        <Route
          path='/dashboard/home'
          element={
            <ProtectedRoute>
              <DashboardHomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path='/dashboard/results'
          element={
            <ProtectedRoute>
              <DashboardResultsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path='/dashboard/profile'
          element={
            <ProtectedRoute>
              <DashboardProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path='/dashboard/scan-eye'
          element={
            <ProtectedRoute>
              <DashboardScanEyePage />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
