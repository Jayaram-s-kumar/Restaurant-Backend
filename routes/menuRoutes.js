const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/', menuController.getAllMenus);//working
router.get('/:id', menuController.getMenuById);//working
router.post('/', menuController.createMenu);//working
router.put('/:id', menuController.updateMenu);//working
router.delete('/:id', menuController.deleteMenu);

module.exports = router;