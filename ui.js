// public/js/ui.js
class UI {
    constructor() {
      this.taskList = document.querySelector('.task-list');
      this.descriptionInput = document.getElementById('description');
      this.categorySelect = document.getElementById('category');
      this.dueDateInput = document.getElementById('dueDate');
      this.addTaskBtn = document.getElementById('addTask');
      this.deleteTasksBtn = document.getElementById('deleteTasks');
      this.alertContainer = document.getElementById('alert-container');
    }
  
    // Display all tasks
    displayTasks(tasks) {
      this.taskList.innerHTML = '';
      
      if (tasks.length === 0) {
        this.taskList.innerHTML = '<p class="no-tasks">No tasks to display. Add a new task!</p>';
        return;
      }
  
      tasks.forEach((task) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.dataset.id = task._id;
  
        // Format date
        let dateDisplay = 'No deadline';
        if (task.dueDate) {
          try {
            const date = new Date(task.dueDate);
            dateDisplay = date.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            });
          } catch (e) {
            console.error('Date parsing error:', e);
          }
        }
  
        // Create category class name
        const categoryClass = `category-${task.category.toLowerCase()}`;
  
        taskItem.innerHTML = `
          <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
          <div class="task-details">
            <div class="task-description">${task.description}</div>
            <div class="task-date">📅 ${dateDisplay}</div>
          </div>
          <div class="task-category ${categoryClass}">${task.category}</div>
        `;
  
        // Add event listener to the checkbox
        const checkbox = taskItem.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => {
          this.toggleTaskCompletion(task._id);
        });
  
        this.taskList.appendChild(taskItem);
      });
    }
  
    // Clear form fields
    clearFields() {
      this.descriptionInput.value = '';
      this.categorySelect.value = 'Personal';
      this.dueDateInput.value = '';
    }
  
    // Get form values
    getTaskInput() {
      return {
        description: this.descriptionInput.value,
        category: this.categorySelect.value,
        dueDate: this.dueDateInput.value || null,
      };
    }
  
    // Get selected task IDs
    getSelectedTaskIds() {
      const checkboxes = document.querySelectorAll('.task-checkbox:checked');
      return Array.from(checkboxes).map(checkbox => 
        checkbox.closest('.task-item').dataset.id
      );
    }
  
    // Show alert message
    showAlert(message, className) {
      // Clear any existing alerts
      this.clearAlerts();
      
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert ${className}`;
      alertDiv.appendChild(document.createTextNode(message));
      
      this.alertContainer.appendChild(alertDiv);
  
      // Hide alert after 3 seconds
      setTimeout(() => {
        alertDiv.remove();
      }, 3000);
    }
    
    // Clear all alerts
    clearAlerts() {
      while (this.alertContainer.firstChild) {
        this.alertContainer.removeChild(this.alertContainer.firstChild);
      }
    }
  }