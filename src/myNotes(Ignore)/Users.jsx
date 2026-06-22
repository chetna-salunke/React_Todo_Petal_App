import { useEffect, useState } from "react";
import axios from "axios";

function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  //axios used
  useEffect(() => {
    const getUsers = async () => {
     try {
        const response =
        await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
        setLoading(false);
        } 
        catch (error) 
        {
          console.log(error);
        }
    };
    getUsers();
  }, []);

  return (
    <div>
      <h2>Users (Axios used)</h2>
        {loading ? (<h2>Loading...</h2>) : (
          users.map((user) => (
          <p key={user.id}>
            {user.name}
          </p>
          ))
        )}
    </div>
  );
}

export default Users;