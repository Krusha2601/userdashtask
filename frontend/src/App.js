
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserListTable from "./components/UserListTable";
import UserDetail from "./components/UserDetail";
import CreateNewUser from "./components/CreateNewUser";


function App() {
 
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserListTable />} />
          <Route path="/userdetails/:id" element={<UserDetail></UserDetail>} />
          <Route path="/create-newuser" element={<CreateNewUser></CreateNewUser>} />   
        </Routes>
      </Router>
    </>
  );
}

export default App;