import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../ApiCalls/userApiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { setAllUsers } from '../../Redux/userSlice';
import EditUserForm from './EditUserForm';

const UserList = () => {
  const allUsers = useSelector((state) => state.userReducer.allUsers);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const getAllUsersFromDb = async () => {
    const response = await getAllUsers();
    if (response.success) {
      dispatch(setAllUsers(response.data));
    }
  };

  useEffect(() => {
    getAllUsersFromDb();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsEditFormOpen(false);
    setSelectedUser(null);
  };


  return (
    <div>
     
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Role</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">{user.role}</td>
              <td className="py-2">
                <button
                  onClick={() => handleEditClick(user)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditFormOpen && (
        <EditUserForm user={selectedUser} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default UserList;