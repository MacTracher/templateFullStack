import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

  const getItems = async () => {
    const response = await axios.get('/api/items');
    setItems(response.data);
  };

  const addItem = async () => {
    if (newItem) {
      await axios.post('/api/items', { name: newItem });
      setNewItem('');
      getItems();
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`/api/items/${itemId}`);
      getItems();
    } catch (err) {
      console.error('Error delete item:', err);
    }
  };

  const updateItem = async (itemId) => {
    try {
      await axios.put(`/api/items/${itemId}`, { name: updatedName });
      setEditingItem(null);
      setUpdatedName('');
      getItems();
    } catch (err) {
      console.error('Error update item:', err);
    }
  };

  const startEditing = (item) => {
    setEditingItem(item._id);
    setUpdatedName(item.name);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      <h1>Items</h1>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="New Item"
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {editingItem === item._id ? (
              <>
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
                <button onClick={() => updateItem(item._id)}>Save</button>
                <button onClick={() => setEditingItem(null)}>Cancel</button>
              </>
            ) : (
              <>
                {item.name}
                <button onClick={() => startEditing(item)}>Edit</button>
                <button onClick={() => deleteItem(item._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
