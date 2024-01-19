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
     
      <div className="flex items-stretch w-full mx-[20px] mt-8 ">
        <div className=" flex items-center mx-96 bg-gradient-to-r from-blue-100 via-sky-200 to-blue-100 ring-2 ring-sky-400 rounded-lg shadow-lg ">
          <h1 className="text-2xl text-blue-500 font-serif font-semibold p-5 ">User Details</h1>
          <p className="text-lg text-blue-500 font-sans font-medium p-5"> ID:- {id}</p>
          <p className="text-lg text-blue-500 font-sans font-medium p-5"> Name:- {selectedUser.Username}</p>
          <p className="text-lg text-blue-500 font-sans font-medium p-5"> Email:- {selectedUser.email}</p>
          <p className="text-lg text-blue-500 font-sans font-medium p-5">Role:- {selectedUser.Role}</p>

         
          <div className="p-6 flex space-x-4">
            <button
              onClick={handleEdit}
              className="bg-sky-700 text-white px-4 py-2 rounded-md hover:bg-cyan-700"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
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