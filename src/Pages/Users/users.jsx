import "./users.scss";
import React, { useContext } from "react";
import {Redirect} from 'react-router-dom'
import { UserRow } from "../../Components/UserRow";
import { Header } from "../../Components/Header";
import { Modal } from "../../Components/Modal";
import {Loader} from '../../Components/Loader'
import { dataContext } from "../../App";
import { themeContext} from '../../App';
import {loginContext} from '../../App'

const Users = () => {

  const data = useContext(dataContext);
  const {theme} = useContext(themeContext);
  const {login} = useContext(loginContext);
  const [openModal, setOpenModal] = React.useState(false);

  return (
    <div className="Users">
      {login==='null' && <Redirect to='/'/>}
      <Header />
      <div className="wrapper">
        <div className="is-flex pt-3 is-justify-content-space-between is-align-items-center">
          <p className={`all-users ${theme}`}>Users ({data.length})</p>
          <button className={`myButton ${theme}`} onClick={()=>{setOpenModal(true)}}><i class="fas fa-plus-circle"></i> Add User</button>
        </div>
        <div className={`table-header is-align-items-center is-justify-content-space-between p-2 has-text-weight-bold ${theme} mt-2`}>
          <p className="col">Id</p>
          <p className="col">Name</p>
          <p className="col">Email</p>
          <p className="col">City</p>
          
        </div>
        {data.length ? data.map((e) => <UserRow data={e} key={e.id} />) : <Loader />}
      </div>
      {openModal ? <Modal openModal={setOpenModal}/> : null}
    </div>
  );
};

export default Users;
