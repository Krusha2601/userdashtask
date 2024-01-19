import React from "react";
import { useState, useEffect } from "react";
import { Link ,useNavigate } from "react-router-dom";

const CreateNewUser = () => {
  const navigate = useNavigate();
  const [editedDetails, setEditedDetails] = useState({
    Username: "",
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
    <div className="flex justify-center mt-[250px]">
    <form class="w-96 h-80 p-2  bg-gradient-to-r from-blue-100 via-sky-200 to-blue-100 ring-2 ring-sky-400 rounded-lg " onSubmit={handlecreateuser}>
      <div className=" text-center text-xl font-semibold font-serif text-blue-500 p-2">Create User</div>
      <div class="mb-5">
        <input
          type="text"
          id="Username"
          name="Username"
          placeholder="Username"
          value={editedDetails.Username}
          onChange={handleChange}
          class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  border-sky-500 placeholder-blue-200"
          required
        />
      </div>
      <div class="mb-5">

        <input
          type="email"
          id="email"
          name="email"
          
          value={editedDetails.email}
          onChange={handleChange}
          class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  border-sky-500 placeholder-blue-200 "
          placeholder="Emial: abc@xyz.com"
          required
        />
      </div>
      <div class="mb-5">
        <input
          type="text"
          id="Role"
          name="Role"
          placeholder="Role"
          value={editedDetails.Role}
          onChange={handleChange}
          class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  border-sky-500 placeholder-blue-200"
          required
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          class=" text-white bg-sky-700 hover:bg-cyan-700 focus:ring-4 mt-[9px] focus:ring-blue-300 font-medium rounded-lg  w-2/5 h-10 text-sm  px-5  text-center"
        >
          Submit
        </button>
        <button
          type="submit"
          class=" m-2 text-white hover:bg-cyan-700 focus:ring-4  focus:ring-blue-300 font-medium rounded-lg text-sm  h-10 px-5 text-center bg-sky-500"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
    </form>
    </div>
  );
};
export default CreateNewUser;