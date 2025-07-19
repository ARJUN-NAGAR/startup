const UserInfoCard = ({ user }) => (
  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
    <h2 className="text-xl font-semibold mb-2">Your Info</h2>
    <p><strong>Name:</strong> {user.name}</p>
    <p><strong>Email:</strong> {user.email}</p>
    <p><strong>Role:</strong> {user.role}</p>
    {user.aadhaarNumber && <p><strong>Aadhaar:</strong> {user.aadhaarNumber}</p>}
  </div>
);
export default UserInfoCard;
