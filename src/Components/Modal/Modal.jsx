import "./Modal.scss";
import React, { useContext, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {themeContext} from '../../App'
import TextField from '@material-ui/core/TextField';
import Modal from "@material-ui/core/Modal";
import {validContext} from '../../App' 

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const MyModal = (props) => {

  const {theme} = useContext(themeContext);
  const {setValidData} = useContext(validContext);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  const handleClose = () => {
    props.openModal(false);
  };

  const submitUser = () => {
    fetch('https://60965395116f3f00174b2f00.mockapi.io/users',{
          method:"POST",
          headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: userName,
            email: userEmail,
            image: 'https://primacgurus.com.au/wp-content/uploads/2021/01/No-Profile-image.jpg'
        })
        
      })
    .then((res) => res.json())
    .then(() => setValidData(false))
    .catch((error) => alert('Oops! Something went wrong... :( Please try again.'))
  }

  const body = (
    <div style={modalStyle} className={`${classes.paper} modal-${theme} modal-view`}>
      <h2 id="simple-modal-title" className="is-size-4 has-text-centered mb-3 main-text">Add New User</h2>
      <p id="simple-modal-description" className="is-flex is-flex-direction-column is-align-items-center">
      <TextField required id="standard-required standard-basic" label="Name" className="m-1 inputs" onChange={(e)=>setUserName(e.target.value)}/>
      <TextField required id="standard-required standard-basic" label="Email" className="m-1 inputs" onChange={(e)=>setUserEmail(e.target.value)}/>
      <button className="submit-button" onClick={()=>{
          submitUser()
          handleClose()
      }}><i class="fas fa-paper-plane"></i> Sumbit</button>
      </p>    
    </div>
  );

  return (
    <div className="Modal">
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default MyModal;
