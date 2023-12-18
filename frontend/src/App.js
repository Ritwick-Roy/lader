import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Files from './pages/Files';
import Lader from './components/models/Lader.js';
import Qagen from './components/models/Qagen.js';


function App() {

  return ( 
    <Router>
    <div className="App">
      <Navbar />  
      <div className="cont">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/lader" element={<Lader/>}/>
          <Route path="/qagen" element={<Qagen/>}/>
          <Route path="/files" element={<Files/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
      <Footer/>
    </div>
   </Router>
  );
}

export default App;