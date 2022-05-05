import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import HomePage from "./components/Home/HomePage.jsx";
import Login from './components/Login/Login.jsx';
import MovieDetails from "./components/Home/Movies/MovieDetails.jsx";
import RequireAuth from "./common/RequireAuth.jsx";

function App() {

  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/movies' element={<RequireAuth><HomePage /></RequireAuth>} />
          <Route exact path='/movies/:id' element={<RequireAuth>< MovieDetails /></RequireAuth>} />
          <Route path="*" element={<Navigate to="/movies" replace />}
          />
        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;
