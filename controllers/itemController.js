const prisma = require('../config/db');

const itemController = {
  // Get all items
  getAllItems: async (req, res) => {
    try {
      const items = await prisma.menuItem.findMany({
        include: { menu: true }
      });
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get items by menu
  getItemsByMenu: async (req, res) => {
    try {
      const items = await prisma.menuItem.findMany({
        where: { menuId: req.params.menuId }
      });
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create item
  createItem: async (req, res) => {
    try {
      const item = await prisma.menuItem.create({
        data: {
          name: req.body.name,
          description: req.body.description,
          price: parseFloat(req.body.price),
          menuId: req.body.menuId
        }
      });
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update item
  updateItem: async (req, res) => {
    try {
      const item = await prisma.menuItem.update({
        where: { id: req.params.id },
        data: {
          name: req.body.name,
          description: req.body.description,
          price: parseFloat(req.body.price),
          menuId: req.body.menuId
        }
      });
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete item
  deleteItem: async (req, res) => {
    try {
      await prisma.menuItem.delete({
        where: { id: req.params.id }
      });
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getItemById: async (req, res) => {
    try {
      const item = await prisma.menuItem.findUnique({
        where: { id: req.params.id },
        include: { menu: true } // Optional: include menu details if needed
      });

      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }

      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = itemController;