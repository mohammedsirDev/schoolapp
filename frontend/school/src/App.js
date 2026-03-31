import './App.css';
import Navbar from './components/navbar';
import Home from './pages/home';
import {Routes, Route} from "react-router-dom"
import Register from './pages/Register';
import Login from './pages/Login';
import TeacherDetails from './pages/details/TeacherDetails'
// CHANGE 1: Renamed from Programs_details to ProgramDetails
import ProgramDetails from './pages/details/ProgramDetails'; 
import EventDetails from './pages/details/EventDetails'
import TestimonialForm from './pages/TestimonialForm'
import Grades from './pages/Grades';
import Footer from './components/Footer'
import ProgramsList from './pages/ProgramsList';
import TeachersList from './pages/TeachersList';
import EventsList from './pages/EventsList'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/teachers/:id' element={<TeacherDetails/>}/>
        {/* CHANGE 2: Updated the component name here as well */}
        <Route path='/programs/:id' element={<ProgramDetails/>}/>
        <Route path='/events/:id' element={<EventDetails/>}/>
        <Route path='/Testimonial' element={<TestimonialForm/>}/>
        <Route path='/grades' element={<Grades/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/programslist' element={<ProgramsList/>}/>
        <Route path='/teachersList' element={<TeachersList/>}/>
        <Route path='/eventsList' element={<EventsList/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;