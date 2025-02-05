import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

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
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
