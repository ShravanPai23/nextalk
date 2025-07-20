import { useEffect, useState } from "react";
import axios from "axios";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/user/getUserProfile",
          {
            withCredentials: true,
          }
        );

        setAllUsers(response.data.allUsers);
      } catch (error) {
        console.error("Error in useGetAllUsers:", error);
      }
      setLoading(false);
    };
    getUsers();
  }, []);

  return [allUsers, loading];
}

export default useGetAllUsers;
