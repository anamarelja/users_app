import './UserRow.scss'
import React, { useContext } from 'react';
import {themeContext} from '../../App'
import {Link} from 'react-router-dom'

const UserRow = (props) => {

    const {theme} = useContext(themeContext)
    
    return ( 
        <Link to={`/users/${props.data.id}`}>
        <div className={`UserRow is-flex-direction-row is-justify-content-space-between is-align-items-center p-4 ${theme} mt-3`}>
            <p className="has-text-weight-bold col">{props.data.id}</p>
            <p className="col">{props.data.name}</p>
            <p className="col">{props.data.email}</p>
            <p className="col">{props.data.city}</p>
        </div>
        </Link>
     );
}
 
export default UserRow;