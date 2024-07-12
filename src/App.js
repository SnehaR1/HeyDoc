
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Registration from './Components/Registration';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AdminUsers from './Components/Admin/AdminUsers';
import AdminDepartments from './Components/Admin/AdminDepartments';
import AddDepartment from './Components/Admin/AddDepartment';
import AdminDoctors from './Components/Admin/AdminDoctors';
import AddDoctor from './Components/Admin/AddDoctor';
import DoctorLogin from './Components/Doctor/DoctorLogin';
import Requests from './Components/Admin/Requests';
import SetPassword from './Components/Doctor/SetPassword';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/SignUp' element={<Registration />} />
          <Route path='/adminlogin' element={<AdminLogin />} />
          <Route path='/adminDashboard' element={<AdminDashboard />} />
          <Route path='/users' element={<AdminUsers />} />
          <Route path='/adminDepartments' element={<AdminDepartments />} />
          <Route path='/addDepartments' element={<AddDepartment />} />
          <Route path='/adminDoctors' element={<AdminDoctors />} />
          <Route path='/addDoctor' element={<AddDoctor />} />
          <Route path='/doctorlogin' element={<DoctorLogin />} />
          <Route path='/requests' element={<Requests />} />
          <Route path='/set_password/:id' element={<SetPassword />} />

        </Routes>
      </Router>

    </div>
  );
}

export default App;
