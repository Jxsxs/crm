import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { db } from "../api/api";
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import './users.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Navigate } from "react-router-dom";

const Users = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const q = query(collection(db, "users"), where("uid", "!=", `${props.user.uid}`));
        const querySnapshot = await getDocs(q);
        const usersData = [];
        querySnapshot.forEach((doc) => {
          usersData.push(doc.data());
        });
        setUsers(usersData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

  const UserCard = ({ user }) => {
    const [role, setRole] = useState(user.role);
    const [redactMode, setRedactMode] = useState(false);

    const handleRoleChange = (event) => {
      setRole(event.target.value);
    };

    const handleEditClick = () => {
      setRedactMode(true);
    };

    const handleSaveClick = async () => {
      try {
        await setDoc(doc(db, "users", `${user.uid}`), {
          age: user.age,
          firstName: user.firstName,
          lastName: user.lastName,
          login: user.login,
          role: role,
          uid: user.uid,
        });
        setRedactMode(false);
      } catch (error) {
        console.log(error);
      }
    };

    const handleDeleteClick = async () => {
      try {
        await deleteDoc(doc(db, 'users', user.uid));
      } catch (error) {
        console.log(error);
      }
    };

    if(props.user.role != 'admin'){
      return <Navigate to='/' />
    }else{
    return (
      <div className="user-card">
        <div>ім'я: {user.firstName}</div>
        <div>прізвище: {user.lastName}</div>
        <div>логін: {user.login}</div>
        <div>
          роль:{" "}
          {redactMode ? (
            <select
              name="role"
              id=""
              value={role}
              onChange={handleRoleChange}
            >
              <option value="user">User</option>
              <option value="driver">Driver</option>
              <option value="dispatcher">Dispatcher</option>
            </select>
          ) : (
            user.role
          )}
        </div>
        <div>id: {user.uid}</div>
        <div>вік: {user.age}</div>
        {redactMode ? (
          <Button variant="primary" onClick={handleSaveClick}>
            зберегти зміни
          </Button>
        ) : (
          <Button variant="primary" onClick={handleEditClick}>
            редагувати користувача
          </Button>
        )}
        <Button variant="primary" onClick={handleDeleteClick}>
видалити користувача
</Button>
</div>
);
}
};

return (
<div className="users-container">
{users.map((user) => (
<UserCard key={user.uid} user={user} />
))}
</div>
);
};
      
      
      
      
        

let mapStateToProps = (state) =>{
    return{
        user: state.auth.currentUser
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Users)