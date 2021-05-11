import './edituser.scss'
import React from 'react';
import TextField from '@material-ui/core/TextField';
import {useContext, useState} from 'react'
import {Redirect} from 'react-router-dom'
import {Header} from '../../Components/Header'
import { dataContext } from "../../App";
import { themeContext } from '../../App'
import {validContext} from '../../App' 
import {loginContext} from '../../App'

const EditUser = (props) => {

    const data = useContext(dataContext);
    const {theme} = useContext(themeContext);
    const { setValidData} = useContext(validContext);
    const {login} = useContext(loginContext)
    const [redirect, setRedirect] = useState(false)
    const user = data.find((e) => e.id === props.match.params.id);  
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');

    const submitUser = () => {
        fetch(`https://60965395116f3f00174b2f00.mockapi.io/users/${user.id}`,{
          method:"PUT",
          headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: userName,
            email: userEmail
        })
      })
    .then((res) => res.json())
    .then(() => {
        setValidData(false)
        setRedirect(true)
    })
    .catch((error) => alert('Oops! Something went wrong... :( Please try again.'))
    }

    return ( 
        <div>
            <Header></Header>
            {login==='null' && <Redirect to='/'/>}
            { redirect && <Redirect to='/users'/>}
            { user && <div className={`editUser ${theme}`}>
                <p className="is-size-4 has-text-centered edit-title p-5">Edit User</p>
                <p id="simple-modal-description" className="is-flex is-flex-direction-column is-align-items-center">
                <TextField required id="standard-required standard-basic" placeholder={user.name} label="New name" className="m-1 edit-inputs" onChange={(e)=>setUserName(e.target.value)}/>
                <TextField required id="standard-required standard-basic" placeholder={user.email} label="New email" className="m-1 edit-inputs" onChange={(e)=>setUserEmail(e.target.value)}/>
                <button className="submit-button" onClick={submitUser}><i class="fas fa-paper-plane"></i> Sumbit</button>
                </p>
            </div>}
        </div>
     );
}
 
export default EditUser;