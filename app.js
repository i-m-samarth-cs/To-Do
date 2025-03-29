// public/js/app.js
document.addEventListener('DOMContentLoaded', () => {
    const taskService = new TaskService();
    const ui = new UI();
  
    // Load tasks when the page loads
    loadTasks();
  
    // Add task event
    ui.addTaskBtn.addEventListener('click', addTask);
  
    // Delete tasks event
    ui.deleteTasksBtn.addEventListener('click', deleteTasks);
  
    // Load tasks
    async function loadTasks() {
      try {
        const tasks = await taskService.getTasks();
        ui.displayTasks(tasks);
      } catch (error) {
        ui.showAlert('Error loading tasks', 'error');
      }
    }
  
    // Add task
    async function addTask() {
      const task = ui.getTaskInput();
  
      // Validate
      if (task.description.trim() === '') {
        ui.showAlert('Please add a description', 'error');
        return;
      }
  
      try {
        await taskService.addTask(task);
        ui.clearFields();
        loadTasks();
        ui.showAlert('Task added successfully', 'success');
      } catch (error) {
        ui.showAlert('Error adding task', 'error');
      }
    }
  
    // Delete tasks
    async function deleteTasks() {
      const selectedIds = ui.getSelectedTaskIds();
      
      if (selectedIds.length === 0) {
        ui.showAlert('Please select tasks to delete', 'error');
        return;
      }
  
      if (confirm('Are you sure you want to delete the selected tasks?')) {
        try {
          await taskService.deleteTasks(selectedIds);
          loadTasks();
          ui.showAlert('Tasks deleted successfully', 'success');
        } catch (error) {
          ui.showAlert('Error deleting tasks', 'error');
        }
      }
    }
  
    // Toggle task completion
    ui.toggleTaskCompletion = async (id) => {
      try {
        await taskService.toggleTaskCompletion(id);
        loadTasks();
      } catch (error) {
        ui.showAlert('Error updating task', 'error');
      }
    };
  });