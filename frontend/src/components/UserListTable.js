import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserListTable() { 
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const navigate = useNavigate();
  const tableContent = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User Name",
      dataIndex: "Username",
      key: "Username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "Role",
      key: "Role",
    },
  ];
  const userdata = (id) => {
    const selectedUser = data.find((item) => item.id === id);
    navigate(`/userdetails/${id}`, { state: { selectedUser } });
  };

  const dataget = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/userdashboard/users?page=${currentPage}`
      );
      const data = await response.json();
      console.log(data.totalPages);
      setTotalPage(data.totalPages);
      console.log(data);
      setData(data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    dataget();
  }, [currentPage]);

  const handleCreateUser = () => {
    navigate("/create-newuser");
  };
  const handlePageChange = (newPage) => {
    console.log("button is clicked");
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="flex place-content-center mt-[150px]  bg-white">
     
        <div className=" w-full bg-gradient-to-r from-blue-100 via-sky-100 to-blue-100 ring-2 ring-sky-400 overflow-hidden rounded-lg shadow-md">
        <h1 className="text-center p-6 font-serif font-extrabold text-3xl ">User List</h1>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className=" border border-collapse ">
                <tr>
                  {tableContent.map((row) => (
                    <th key={row.key} className="py-2 px-4 border-2 font-bold text-lg font-serif border-sky-700">
                      {row.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => userdata(item.id)}
                  >
                    {tableContent.map((row) => (
                      <td key={row.key} className="py-2 px-4 border-2 font-medium font-sans border-sky-700">
                        {row.render
                          ? row.render(item[row.dataIndex], item)
                          : item[row.dataIndex]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center my-2 mx-2">
            <button
              className="bg-sky-500 hover:bg-cyan-600 text-white text-lg py-2 px-4 rounded cursor-pointer mb-2"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-600 text-sm mb-2 ">
              Page {currentPage}
            </span>
            <button
              className="bg-sky-500 hover:bg-cyan-600 text-white py-2 px-4 rounded cursor-pointer mb-2"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPage}
            >
              Next
            </button>
            <button
              type="button"
              className="border rounded-md text-center w-[100px] my-2 text-white text-sm bg-sky-600 hover:bg-cyan-700"
              onClick={handleCreateUser}
            >
              Create User
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserListTable ;
