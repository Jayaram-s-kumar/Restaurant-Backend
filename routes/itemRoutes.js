const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.getAllItems);//working
router.get('/menu/:menuId', itemController.getItemsByMenu);//working
router.post('/', itemController.createItem);//working
router.put('/:id', itemController.updateItem);//working
router.get('/:id', itemController.getItemById);//working
router.delete('/:id', itemController.deleteItem);//working

module.exports = router;