import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './component/Home';
import Navbar from './component/Navbar';
import Account from './component/Account';
import Register from './component/Register';
import Login from './component/Login';
import Contact from './component/Contact';
import Errorpage from './component/Errorpage';
import Logout from './component/Logout';
import { createContext, useReducer } from 'react';
import { initialState,reducer } from './component/Reducer/Reducer';

export const UserContext = createContext();

const Routing = () =>{
  return(
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/account' element={<Account/>}/>
        <Route exact path='/contact' element={<Contact/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/logout' element={<Logout/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route path="*" element={<Errorpage />}/>
      </Routes>
  )
}

function App() {

  const [state,dispatch] = useReducer(reducer,initialState);

  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
    <BrowserRouter>
    <Navbar/>
      <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
    </>
  );
}

export default App;
