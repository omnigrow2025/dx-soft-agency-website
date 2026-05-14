import React from "react";

export const NavAvatar: React.FC<{
  onLogout: () => void;
  avatarUrl?: string;
}> = ({ onLogout, avatarUrl }) => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            src={avatarUrl || "https://i.pravatar.cc/300"}
            alt="User Avatar"
          />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
      >
        <li>
          <button onClick={onLogout} className="justify-between">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};
