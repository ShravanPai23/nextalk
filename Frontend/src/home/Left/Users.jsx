import React from "react";
import useGetAllUsers from "../../context/userGetAllUsers";
import User from "./User";

const Users = ({ searchQuery }) => {
  const [allUsers, loading] = useGetAllUsers();

  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="text-white text-center py-4">Loading users...</div>;
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="text-gray-400 text-center py-4">No users found.</div>
    );
  }

  return (
    <div
      style={{ maxHeight: "calc(84vh - 1vh)" }}
      className="overflow-y-auto scrollbar-hide bg-gray-800 rounded-lg p-2 "
    >
      {filteredUsers.map((user) => (
        <User key={user._id || user.email} user={user} />
      ))}
    </div>
  );
};

export default Users;
