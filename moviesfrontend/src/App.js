import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Movie from './/pages/Movie';
import Addmovie from './pages/Addmovie';
import Editmovie from './pages/Editmovie';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Movie />}/>
        <Route path="/movies/create" element={<Addmovie />} />
        <Route path="/movies/edit/:id" element={<Editmovie />} />
      </Routes>
    </Router>

      
    
  );
}

export default App;
