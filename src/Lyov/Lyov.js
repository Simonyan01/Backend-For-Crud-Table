import React, { useState } from 'react';
import './Lyov.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";



const initialValues = {
  userName: '',
  userSurname: '',
  userSalary: '',
  userAge: ''
}

function Lyov() {
  const [userData, setUserData] = useState(initialValues)
  const [users, setUsers] = useState([]);
  const [ediTableUserData, setEdiTableUserData] = useState({
    IsEdit: false,
    userIndex: null
  })
  const handleRemoveClick = (index) => {
    setUsers(users.filter((user, userIndex) => userIndex !== index));
  }
  const isFilledFields = userData.userName && userData.userSurname && userData.userSalary;

  const handleSubmitUser = (e) => {

    e.preventDefault();
    if (isFilledFields) {
      if (ediTableUserData.IsEdit) {
        const editedData = users;
        editedData.splice(ediTableUserData.userIndex, 1, userData)

        setUsers(editedData);

        setEdiTableUserData({
          IsEdit: false,
          userIndex: null
        })

      } else {
        setUsers((prevState) => [...prevState, userData]);
      }
      setUserData(initialValues);
    }

  }

  const handleClearClick = () => setUserData(initialValues);

  const handleEditClick = (data, index) => {
    setUserData(data);
    setEdiTableUserData({
      IsEdit: true,
      userIndex: index
    })

  }
  console.log('users:', users);

  return (
    <div className='container' >
      <div className='content'>
        <div className='table-data'>
          <table key={users.id}>
            <tbody>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Age</th>
                <th scope="col">Salary</th>
                <th scope="col">Actions</th>
              </tr>
            </tbody>
            <tbody className = 'users' >
              {users.map((user, index) => (
                <tr key={index} >
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    {user.userName}
                  </td>
                  <td>
                    {user.userSurname}
                  </td>
                  <td>
                    {user.userAge}
                  </td>
                  <td>
                    {user.userSalary}
                  </td>
                  <td>
                    <div>
                      <button className='editButton' onClick={() => handleEditClick(user, index)}><FontAwesomeIcon icon={faPen} /></button>
                      <button className='removeButton' onClick={() => handleRemoveClick(index)}><FontAwesomeIcon icon={faTrash} color /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form onSubmit={handleSubmitUser} onReset={handleClearClick}>
          <input placeholder='Write your Name'
            onChange={(e) => setUserData((prevState) => ({
              ...prevState,
              userName: e.target.value

            }))}
            value={userData.userName}

          />


          <input placeholder='Write your Surname'
            onChange={(e) => setUserData((prevState) => ({
              ...prevState,
              userSurname: e.target.value
            }))}
            value={userData.userSurname}
          />


          <input placeholder='Write your Age'
            onChange={(e) => setUserData((prevState) => ({
              ...prevState,
              userAge: e.target.value
            }))}
            value={userData.userAge}
          />
          
          <input placeholder='Write your Salary'
            onChange={(e) => setUserData((prevState) => ({
              ...prevState,
              userSalary: e.target.value
            }))}
            value={userData.userSalary}
          />




          <div className='buttons-wrapper'>
            <button className='clearButton' type="reset">
              Clear
            </button>
            <button className='editAddButton' disabled={!isFilledFields} type="submit">
              {ediTableUserData.IsEdit ? <FontAwesomeIcon icon={faPen} /> : 'Add'}

            </button>


          </div>
        </form>
      </div>
    </div>
  );
}


export default Lyov;
