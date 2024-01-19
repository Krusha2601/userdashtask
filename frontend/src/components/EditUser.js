import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditUser = ({ isOpen, onClose, id }) => {
    const navigate = useNavigate();
  const [editedDetails, setEditedDetails] = useState({
    Username: "",
    email: "",
    Role: "",
  });
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/userdashboard/user/${id}`);
        const data = await response.json();
        console.log(data);
        setEditedDetails({
          Username: data.Username || "",
          email: data.email || "",
          Role: data.Role || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      
    };
    if(isOpen){
      fetchData();
    }
  } , [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      Username: editedDetails.Username,
      email: editedDetails.email,
      Role: editedDetails.Role,
    };
    console.log(JSON.stringify(formData));
    try {
      const response = await fetch(
        `http://localhost:5000/userdashboard/userupdate/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("User updated successfully");
        navigate("/");
        onClose();
         
      } else {
        console.error("Failed to update user:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-auto ${isOpen ? "" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-slate-200 p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Edit User Details</h2>
          <form onSubmit={handleSubmit}>
            <label className="block mb-4">
              User Name:
              <input
                type="text"
                name="Username"
                value={editedDetails.Username}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full mt-1"
              />
            </label>

            <label className="block mb-4">
              Email:
              <input
                type="text"
                name="email"
                value={editedDetails.email}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full mt-1"
              />
            </label>

            <label className="block mb-4">
              Role:
              <input
                type="text"
                name="Role"
                value={editedDetails.Role}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full mt-1"
              />
            </label>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default EditUser;