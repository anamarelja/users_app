import "./Header.scss";
import React, { useContext } from "react";
import {Link} from 'react-router-dom'
import { themeContext } from "../../App";
import {loginContext} from '../../App'

const Header = () => {
  const { theme, setTheme } = useContext(themeContext);
  const { setLogin } = useContext(loginContext)
  const changeTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div className={`Header ${theme}`}>
      <div className="wrapper">
        <div className="Logo has-text-white">
          <i className="fas fa-users"></i> Users App
        </div>
        <div className="SwitchMode has-text-white">
          {localStorage.getItem('login') !=='null' && localStorage.getItem('login') && <Link className="has-text-white mr-3 has-text-weight-semibold" to='/' onClick={()=>{
            localStorage.removeItem("login")
            setLogin(null)
            }}>Logout</Link>}
          <button onClick={changeTheme} className="switch-button">{theme === 'light' ? <i class="fas fa-moon is-size-5"></i> : <i class="fas fa-sun is-size-5"></i>}</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
