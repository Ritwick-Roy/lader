import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Form from './pages/Predict';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Docan from './components/models/Docan.js';


function App() {

  return ( 
    <Router>
    <div className="App">
      <Navbar />  
      <div className="cont">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/predict" element={<Form/>}/>
          <Route path="/doc_an" element={<Docan/>}/>
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