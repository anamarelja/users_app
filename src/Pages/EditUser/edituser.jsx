import "./edituser.scss";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { Header } from "../../Components/Header";
import { dataContext } from "../../App";
import { themeContext } from "../../App";
import { validContext } from "../../App";
import { loginContext } from "../../App";

const EditUser = (props) => {
  const data = useContext(dataContext);
  const { theme } = useContext(themeContext);
  const { setValidData } = useContext(validContext);
  const { login } = useContext(loginContext);
  const [redirect, setRedirect] = useState(false);
  const user = data.find((e) => e.id === props.match.params.id);
  const [editUser, setEditUser] = useState({...user})

  const submitUser = () => {
    fetch(`https://60965395116f3f00174b2f00.mockapi.io/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
          editUser
      ),
    })
      .then((res) => res.json())
      .then(() => {
        setValidData(false);
        setRedirect(true);
      })
      .catch((error) =>
        alert("Oops! Something went wrong... :( Please try again.")
      );
  };

const submitForm = async (event) => {
    event.preventDefault()
    try{
        await submitUser()
    } catch(e){
        alert('Oops! Something went wrong... :( Please try again.')
    }
}

  return (
    <div>
      <Header></Header>
      {login === "null" && <Redirect to="/" />}
      {redirect && <Redirect to="/users" />}
      {user && (
        <div className={`editUser ${theme}`}>
          <p className="is-size-4 has-text-centered edit-title p-5">
            Edit User
          </p>
          <p
            id="simple-modal-description"
            className="is-flex is-flex-direction-column is-align-items-center"
          >
            <form onSubmit={submitForm}>
              <TextField
                required
                id="standard-required standard-basic"
                placeholder={user.name}
                label="New name"
                className="m-1 edit-inputs"
                onChange={(e) => setEditUser({...editUser, name: e.target.value})}
              />
              <TextField
                required
                id="standard-required standard-basic"
                placeholder={user.email}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                type="email"
                label="New email"
                className="m-1 edit-inputs"
                onChange={(e) => {
                    setEditUser({...editUser, email: e.target.value})
                }}
              />
              <TextField
                required
                id="standard-required standard-basic"
                placeholder={user.username}
                label="New username"
                className="m-1 edit-inputs"
                onChange={(e) => setEditUser({...editUser, username: e.target.value})}
              />
              <TextField
                required
                id="standard-required standard-basic"
                placeholder={user.phone}
                label="New phone number"
                className="m-1 edit-inputs"
                onChange={(e) => setEditUser({...editUser, phone: e.target.value})}
              />
              <TextField
                required
                id="standard-required standard-basic"
                placeholder={user.website}
                label="New website"
                className="m-1 edit-inputs"
                onChange={(e) => setEditUser({...editUser, website: e.target.value})}
              />
              <TextField
                required
                id="standard-required standard-basic"
                placeholder={user.company}
                label="New company name"
                className="m-1 edit-inputs"
                onChange={(e) => setEditUser({...editUser, company: e.target.value})}
              />
              <button
                type="submit"
                className="submit-button"
              >
                <i class="fas fa-paper-plane"></i> Sumbit
              </button>
            </form>
          </p>
        </div>
      )}
    </div>
  );
};

export default EditUser;