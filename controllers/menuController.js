const prisma = require('../config/db');

const menuController = {
    // Get all menus with their items
    getAllMenus: async (req, res) => {
        console.log("get all menus");
        try {
            const menus = await prisma.menu.findMany({
                include: { items: true }
            });
            res.json(menus);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
 
    // Get single menu
    getMenuById: async (req, res) => {
        console.log("get single menu");
        try {
            const menu = await prisma.menu.findUnique({
                where: { id: req.params.id },
                include: { items: true }
            });
            if (!menu) {
                return res.status(404).json({ error: 'Menu not found' });
            }
            res.json(menu);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Create menu
    createMenu: async (req, res) => {
        try {
            console.log(req.body);
            console.log("inside create menu");
            const menu = await prisma.menu.create({
                data: {
                    name: req.body.name,
                    description: req.body.description
                }
            });
            res.status(201).json(menu);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update menu
    updateMenu: async (req, res) => {
        try {
            const menu = await prisma.menu.update({
                where: { id: req.params.id },
                data: {
                    name: req.body.name,
                    description: req.body.description
                }
            });
            res.json(menu);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete menu
    deleteMenu: async (req, res) => {
        try {
            await prisma.menu.delete({
                where: { id: req.params.id }
            });
            res.json({ message: 'Menu deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = menuController;