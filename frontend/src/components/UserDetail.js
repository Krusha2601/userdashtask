import React, { useState } from "react";
import { useParams,useLocation  } from "react-router-dom";
import EditUser from "./EditUser";
import { useNavigate } from "react-router-dom";

const UserDetail = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedUser = location.state?.selectedUser;
  const { id } = useParams();
  

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = (id) => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
   };

 

  const handleDelete = async () => {
    try {
      alert("Are you sure want to delete this User");
      const response = await fetch(
        `http://localhost:5000/userdashboard/userdelete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("User deleted successfully");
        navigate("/");
      } else {
        console.error("Failed to delete user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    console.log("Delete button clicked");
  };

  return (
    <>
     
      <div className="container mx-auto mt-8 ">
        <div className="bg-stone-300 rounded shadow-lg ">
          <h1 className="text-2xl font-sans font-semibold p-5">User Details</h1>
          <p className="text-lg font-sans font-medium p-5">User ID: {id}</p>
          <p className="text-lg font-sans font-medium p-5">User Name:- {selectedUser.Username}</p>
          <p className="text-lg font-sans font-medium p-5">User Email:- {selectedUser.email}</p>
          <p className="text-lg font-sans font-medium p-5">User Role:- {selectedUser.Role}</p>

         
          <div className="p-6 flex space-x-4">
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <EditUser
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        id={id}
      />
    </>
  );
};

export default UserDetail;