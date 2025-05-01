const express = require('express')
const router = express.Router();
const authMiddleWare = require('../middleware/userAuth')
const projectController = require('../controller/projectController')

router.post('/create', authMiddleWare.authUser , projectController.createProject)
router.get('/:projectId', authMiddleWare.authUser, projectController.readProject)
router.patch('/:projectId', authMiddleWare.authUser, projectController.updateProStatus)


module.exports = router