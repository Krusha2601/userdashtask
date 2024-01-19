import React from "react";
import { useState, useEffect } from "react";
import { Link ,useNavigate } from "react-router-dom";

const CreateNewUser = () => {
  const navigate = useNavigate();
  const [editedDetails, setEditedDetails] = useState({
    username: "",
    email: "",
    Role: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlecreateuser = async (e) => {
    e.preventDefault();

    const formData = {
      Username: editedDetails.Username,
      email: editedDetails.email,
      Role: editedDetails.Role,
    };
    console.log(JSON.stringify(formData));
    try {
      const response = await fetch(`http://localhost:5000/userdashboard/newuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User updated successfully");
        navigate("/");
      } else {
        console.error("Failed to update user:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
    console.log("submit created");
  };

  return (
    <form class="max-w-sm mx-auto mt-[150px]" onSubmit={handlecreateuser}>
      <div className="mb-[50px] font-medium text-blue-500 ">Create User</div>
      <div class="mb-5">
        <label
          for="Username"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Username
        </label>
        <input
          type="text"
          id="Username"
          name="Username"
          value={editedDetails.Username}
          onChange={handleChange}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={editedDetails.email}
          onChange={handleChange}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="role"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Role
        </label>
        <input
          type="text"
          id="Role"
          name="Role"
          value={editedDetails.Role}
          onChange={handleChange}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="flex">
        <button
          type="submit"
          class="ml-[100px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <button
          type="submit"
          class="ml-[20px] text-white bg-gray-400 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
    </form>
  );
};
export default CreateNewUser;