import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import BrowseCars from './components/BrowseCars';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<BrowseCars />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
);

export default AppRoutes;