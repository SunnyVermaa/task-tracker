const taskModel = require('../models/tasksModels');
const projectModel = require('../models/projectModel');
const { findById } = require('../models/userModel');

module.exports.createTask = async (req, res) => {
  try {
    const { projectId, title, description } = req.body;

    const project = await projectModel.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    
    const task = new taskModel({ project: projectId, title, description });
    await task.save();

    
    project.tasks.push(task._id);
    await project.save();

    res.status(201).json({data : task});
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

module.exports.readTask =async (req, res) => {
  try{
    const {taskId} = req.params;
    const task = await taskModel.findById(taskId)

    if(!task) return res.status(404).json({error : 'task not found'})

      res.status(200).json({data : task})

  }catch(error){
    console.log(error);
    
  }
}

 module.exports.updateTaskStatus = async (req, res) => {
    try {
      const { taskId } = req.params;
      const { status } = req.body;
      // console.log(status);
      
      const userId = req.user._id;
      // console.log(userId);
      
      
      const validStatuses = ['In Progress', 'Completed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
      }
  

      const task = await taskModel.findById(taskId);
      
      if (!task) {
        return res.status(404).json({ error: 'task not found or unauthorized' });
      }
  
     
      task.status = status;
      
      if(status === 'Completed'){
        task.completedAt = new Date()
      }
      await task.save();
  
      res.status(200).json({ message: 'Project status updated', data : task });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update project status' });
    }
  };

  module.exports.updateTask = async(req, res) =>{
    try{
      const {taskId} = req.params;
      const {title , description} = req.body;
      const task = await taskModel.findById(taskId)
      if(!task) return res.status(404).json({error : 'task not found'})

        if(title) task.title = title;
        if(description) task.description = description;

        await task.save()
        res.status(201).json({message: 'task updated sucessfully', data:task})

    }catch(error){
      console.log(error);
      
    }
  }

module.exports.deleteTask = async (req, res) =>{
  try{

    const {taskId} = req.params;

    const task = await taskModel.findById(taskId)
    if(!task) return res.status(404).json({error : 'task not found'})

      await projectModel.findByIdAndUpdate(task.project, {
        $pull: {tasks: task._id}
      })

      await taskModel.findByIdAndDelete(taskId)
      res.status(200).json({message : 'tasks deleted'})

  }catch(error){
    console.log(error);
    
  }
}
