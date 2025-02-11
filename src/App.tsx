import React from 'react';
import { Route, Routes } from 'react-router-dom';
import  Home  from './pages/Home';
import  Favorites  from './pages/Favorites';
import Header from './components/Header/Header';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
};

export default App;
