import React, { useState } from "react";
import Search from "./Search";
import Users from "./Users";

const Left = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      tabIndex={0}
      className="left-container w-[29%] md:w-[29%] bg-gray-800 text-white p-[12px] h-screen"
    >
      <h1 className="text-xl mb-2">Nextalk</h1>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="users-container">
        <Users searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Left;
