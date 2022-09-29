import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout';
import Teken466 from './Teken466/Teken466';
import PrestressedConcrete from './PrestressedConcrete/PrestressedConcrete'


function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="TEKEN466" element={<Teken466 />}  />
            <Route path="PrestressedConcrete" element={<PrestressedConcrete />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;



 