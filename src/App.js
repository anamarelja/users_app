import "./App.scss";
import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { EditUser } from "./Pages/EditUser";
import { Login } from "./Pages/Login";
import { SingleUser } from "./Pages/SingleUser";
import { Users } from "./Pages/Users";
import { useState } from "react";

export const dataContext = React.createContext({});
export const themeContext = React.createContext({});
export const validContext = React.createContext({});
export const loginContext = React.createContext({});

function App() {
  const [data, setData] = useState([]);
  const [validData, setValidData] = useState(false);
  const [theme, setTheme] = useState("light");
  const [login, setLogin] = useState(localStorage.getItem('login'));

  const { Provider: DataContext } = dataContext;
  const { Provider: ThemeProvider } = themeContext;
  const { Provider: ValidProvider } = validContext;
  const { Provider: LoginProvider } = loginContext;

  useEffect(() => {
    if (!validData) {
      fetch("https://60965395116f3f00174b2f00.mockapi.io/users")
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setValidData(true);
        });
    }
  }, [validData]);

  return (
    <div className={`App ${theme}`}>
      <Switch>
        <DataContext value={data}>
          <ValidProvider value={{ validData, setValidData }}>
            <ThemeProvider value={{ theme, setTheme }}>
              <LoginProvider value={{ login, setLogin }}>
                <Route exact path="/" component={Login} />
                {login ? <Route exact path="/users" component={Users} /> : <Redirect to='/'/>}
                {login ? <Route exact path="/users/:id" component={SingleUser} /> : <Redirect to='/'/>}
                {login ? <Route path="/users/:id/edit" component={EditUser} /> : <Redirect to='/'/>}    
                
              </LoginProvider>
            </ThemeProvider>
          </ValidProvider>
        </DataContext>
      </Switch>
    </div>
  );
}

export default App;
