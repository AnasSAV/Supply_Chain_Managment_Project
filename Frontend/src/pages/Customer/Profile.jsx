import React, { useState } from 'react';

const Profile = () => {
  
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Springfield',
  });


  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData); 
    setEditing(false); 
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Profile</h1>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white rounded-md p-2">
            Save
          </button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <button
            onClick={() => setEditing(true)}
            className="mt-4 bg-orange-500 text-white rounded-md p-2"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
