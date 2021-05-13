import "./singleuser.scss";
import React, { useContext, useState, useEffect } from "react";
import { Header } from "../../Components/Header";
import { Redirect, Link } from 'react-router-dom'
import { dataContext } from "../../App";
import { themeContext } from '../../App'
import {loginContext} from '../../App'
import { validContext } from '../../App'

const SingleUser = (props) => {
  const [user, setUser] = useState([])
  const userID = props.match.params.id
  const {theme} = useContext(themeContext);
  const {login} = useContext(loginContext)
  const { setValidData} = useContext(validContext)
  const [redirect, setRedirect] = useState(false)
  // const user = data.find((e) => e.id === props.match.params.id);
  // const data = useContext(dataContext);

  useEffect (()=>{
    fetch(`https://60965395116f3f00174b2f00.mockapi.io/users/${userID}`)
    .then(res => res.json())
    .then(data => setUser(data))
  }, [userID])

  const deleteUser = () => {
    fetch(`https://60965395116f3f00174b2f00.mockapi.io/users/${userID}`,{
      method:"DELETE",
      headers: { 
        "Content-Type": "application/json",
       },
    })
    .then(res => res.json())
    .then(()=>{
      setValidData(false)
      setRedirect(true)
    })
    .catch((error) => alert('Oops! Something went wrong... :( Please try again.'))
  }

  return (
    <div>
      <Header></Header>
      <div className="SingleUser">
        {login==='null' && <Redirect to='/'/>}
        {redirect && <Redirect to='/users'/>}
        {user && (
          <div className={`user-card is-flex is-flex-direction-column is-align-items-center ${theme}`}>
            <div className="is-flex is-align-items-center is-justify-content-space-between user-details">
              <img src={user.image} alt="user-profile" />
              <div className="ml-5">
                <div className="main-details">
                  <p className={`is-size-2-desktop is-size-2-tablet has-text-weight-semibold ${theme}`}>{user.name}</p>
                  <p className="is-size-5-desktop is-size-1-tablet has-text-grey-light">{user.city}</p>
                </div>
                <table className={`table ${theme}`}>
                    <tr>
                        <th className="has-text-weight-light has-text-grey">Username:</th>
                        <th className="has-text-weight-light has-text-grey">{user.username}</th>
                    </tr>
                    <tr>
                        <th className="has-text-weight-light has-text-grey">Email:</th>
                        <th className="has-text-weight-light has-text-grey">{user.email}</th>
                    </tr>
                    <tr>
                        <th className="has-text-weight-light has-text-grey">Website:</th>
                        <th className="has-text-weight-light has-text-grey">{user.website}</th>
                    </tr>
                    <tr>
                        <th className="has-text-weight-light has-text-grey">Phone:</th>
                        <th className="has-text-weight-light has-text-grey">{user.phone}</th>
                    </tr>
                    <tr>
                        <th className="has-text-weight-light has-text-grey">Company:</th>
                        <th className="has-text-weight-light has-text-grey">{user.company}</th>
                    </tr>
                </table>
              </div>
            </div>
            <div className="m-5">
              <button className="has-text-white delete-button" onClick={deleteUser}><i class="fas fa-user-times"></i> Delete</button>
              <Link to={`/users/${user.id}/edit`}><button className="ml-3 edit-button has-text-white"><i class="fas fa-user-edit"></i> Edit</button></Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleUser;
