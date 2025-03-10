import { Routes, Route } from 'react-router';
import './App.css';
import HomePage from './pages/landing-page/HomePage';
import RegisterPage from './pages/auth-page/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/auth-page/LoginPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
