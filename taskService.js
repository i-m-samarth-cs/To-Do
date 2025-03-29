// public/js/taskService.js
const API_BASE_URL = "https://your-app.onrender.com/api/tasks"; // Use your Render backend URL
class TaskService {
    constructor() {
      this.apiUrl = '/api/tasks';
    }
  
    // Get all tasks
    async getTasks() {
      try {
        const response = await fetch(this.apiUrl);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
      }
    }
  
    // Add a new task
    async addTask(task) {
      try {
        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error adding task:', error);
        throw error;
      }
    }
  
    // Delete tasks
    async deleteTasks(ids) {
      try {
        const response = await fetch(`${this.apiUrl}/delete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ids }),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error deleting tasks:', error);
        throw error;
      }
    }
  
    // Toggle task completion status
    async toggleTaskCompletion(id) {
      try {
        const response = await fetch(`${this.apiUrl}/${id}/toggle`, {
          method: 'PUT',
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error toggling task:', error);
        throw error;
      }
    }
  }