import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteUser,
    getAllUser,
    updateRole,
} from "../../features/admin/adminSlice";

const ViewUsers = () => {

  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.adminSlice);


  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);


  const onRoleChange = (id, newRole) => {
    dispatch(updateRole({ id, newRole }));
    dispatch(getAllUser());
  }

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
      dispatch(getAllUser());
    }
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="space-y-4">
      {users?.map((user) => (
  <div
    key={user._id}
    className="flex flex-wrap md:flex-nowrap items-center gap-4 bg-white shadow p-4 rounded-md"
  >
    {/* Avatar and Info */}
    <div className="flex items-center gap-4 flex-1 min-w-[200px]">
      <img
        src={user.avatar.public_url}
        alt={user.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
    </div>

    {/* Role + Delete */}
    <div className="flex items-center gap-4 ml-auto">
      <select
        value={user.role}
        onChange={(e) => onRoleChange(user._id, e.target.value)}
        className="border border-gray-300 rounded p-1"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button
        onClick={() => onDelete(user._id)}
        className="text-red-500 hover:text-red-700 transition"
        title="Delete User"
      >
        <FaTrash />
      </button>
    </div>
  </div>
))}
    </div>
    </div>
  );
}

export default ViewUsers
