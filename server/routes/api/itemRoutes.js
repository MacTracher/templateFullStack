const express = require('express');
const Item = require('../../models/Item');
const router = express.Router();

router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/items', async (req, res) => {
  const item = new Item({
    name: req.body.name,
  });
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id,
    {name: req.body.name},
    {new: true}
  );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
