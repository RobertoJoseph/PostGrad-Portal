import logo from './logo.svg';
import './App.css';
import Main from './components/MainComponent'
import Header from './components/HeaderComponent'
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Main></Main>
      </div>
    </BrowserRouter>


  );
}

export default App;
