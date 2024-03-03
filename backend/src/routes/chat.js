const express = require('express');
const chatController = require('../controller/chatController');
const router = express.Router();

router.post('/create', chatController.accessChat);
router.get('/', chatController.fetchChats);
router.post('/group', chatController.createGroupChat);
router.put('/rename', chatController.createGroupChat);
router.put('/addgroup', chatController.removeFromGroup);
router.put('/removegroup', chatController.addToGroup);

module.exports = router;