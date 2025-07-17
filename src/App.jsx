import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Disp from './components/Disp';
import Logout from './components/Logout';
import Ct from './components/Ct';
import PrivateRoute from './components/PrivateRoute';
import Edit from './components/Edit';

function App() {
  let [store, setStore] = useState(null)
  let updstore = (obj) => {
    setStore({ ...store, ...obj })
  }
  let obj = { "store": store, "updstore": updstore }
  return (
    <BrowserRouter>
      <nav style={{ padding: '10px', background: '#eee' }}>
        {!store && <>
          <Link to="/" style={{ margin: '0 10px' }}>Register</Link>
          <Link to="/login" style={{ margin: '0 10px' }}>Login</Link>
        </>}
        {store && <Link to="/logout" style={{ margin: '0 10px' }}>Logout</Link>}
      </nav>

      <Ct.Provider value={obj}>
        <div>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path="/edit/:email" element={<Edit />} />
            <Route path="/disp" element={
              <PrivateRoute>
                <Disp />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </Ct.Provider>
    </BrowserRouter>
  );
}

export default App;





