const express = require('express')
const router = express.Router();
const authMiddleWare = require('../middleware/userAuth')
const taskController = require('../controller/taskController')

router.post('/create', authMiddleWare.authUser , taskController.createTask)
router.get('/:taskId', authMiddleWare.authUser, taskController.readTask)
router.patch('/:taskId', authMiddleWare.authUser, taskController.updateTaskStatus)
router.patch('/update/:taskId', authMiddleWare.authUser, taskController.updateTask)
router.delete('/:taskId', authMiddleWare.authUser, taskController.deleteTask)

module.exports = router