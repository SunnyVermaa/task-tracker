const projectModel = require('../models/projectModel')
const taskModel = require('../models/tasksModels')

module.exports.createProject = async (req, res) => {
    try {
      const { name, description } = req.body;
      const owner = req.user._id;
  
     
      const projectCount = await projectModel.countDocuments({ owner });
  
      if (projectCount >= 4) {
        return res.status(400).json({ error: 'You can only create up to 4 projects.' });
      }
  

      const project = new projectModel({ name, description, owner });
      await project.save();
  
      res.status(201).json({data : project});
    } catch (error) {
      res.status(500).json({ error: 'Failed to create project' });
    }
  };

  

  module.exports.readProject = async (req, res) => {
    try {
      const { projectId } = req.params;
  
      const project = await projectModel.findById(projectId).populate('tasks');
      res.status(200).json({data : project});
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  };

  module.exports.updateProStatus = async (req, res) => {
    try {
      const { projectId } = req.params;
      const { status } = req.body;
      const userId = req.user._id;
      
      const validStatuses = ['Not Started', 'In Progress', 'Completed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
      }
  
    
      const project = await projectModel.findOne({ _id: projectId, owner: userId });
      if (!project) {
        return res.status(404).json({ error: 'Project not found or unauthorized' });
      }

      if(status === 'Completed'){
        const isCompletedTask = await taskModel.find({
          project:projectId,
          status : {$ne : 'Completed'}
        })

        if(isCompletedTask.length > 0){
         return res.status(400).json({message : "first complete all task"})
        }
      }
  

      project.status = status;
      await project.save();
  
      res.status(200).json({ message: 'Project status updated', data: project });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update project status' });
    }
  };