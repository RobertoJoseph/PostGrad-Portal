import logo from './logo.svg';
import './App.css';
import Main from './components/MainComponent'
import Header from './components/HeaderComponent'
import { BrowserRouter } from 'react-router-dom';
import StudentNavbar from './components/StudentNavbar';
import SupervisorNavbar from './components/SupervisorNavbar';
import ExaminerNavbar from './components/ExaminerNavbar';


function App() {
  return (
    <BrowserRouter>
      <Main></Main>
    </BrowserRouter>

  );
}

export default App;
