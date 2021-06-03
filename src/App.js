import './App.css';
import {useState} from "react"
import Homepage from './Pages/Homepage';
import LoginPage from './Pages/LoginPage';

function App() {
const [isLogin] = useState(true);
  return (
    isLogin?
      <Homepage/>
    :<LoginPage/>
  );
}

export default App;
