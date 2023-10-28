import React, { useState } from 'react';
import axios from 'axios';

function CreateItemForm() {
  // Define the state for the form fields
  const [formData, setFormData] = useState({
    name: '',
    bought: '',
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the server
      const response = await axios.post('http://localhost:2000/items', formData);
      console.log('Item created:', response.data);
      // Clear the form fields
      setFormData({ name: '', bought: '' });
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <div>
      <h2>Create Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="bought">Bought:</label>
          <input
            type="text"
            id="bought"
            name="bought"
            value={formData.bought}
            onChange={(e) =>
              setFormData({ ...formData, bought: e.target.value })
            }
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default CreateItemForm;
