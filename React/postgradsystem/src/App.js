import logo from './logo.svg';
import './App.css';
import Main from './components/MainComponent'
import Header from './components/HeaderComponent'
import { BrowserRouter } from 'react-router-dom';
import StudentNavbar from './components/StudentNavbar';
import SupervisorNavbar from './components/SupervisorNavbar';
import ExaminerNavbar from './components/ExaminerNavbar';
import Home from './components/HomeComponent';


function App() {
  return (
    <BrowserRouter>
      <Home></Home>
    </BrowserRouter>

  );
}

export default App;
