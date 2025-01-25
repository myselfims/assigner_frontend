export const fetchTasksAPI = async () => {
    // Simulating a fetch call
    return [
      { id: 1, title: "Task 1", description: "Description 1", status: "to-do" },
      { id: 2, title: "Task 2", description: "Description 2", status: "in-progress" },
      { id: 3, title: "Task 3", description: "Description 3", status: "completed" },
      { id: 4, title: "Task 4", description: "Description 4", status: "to-do" },
    ];
  };
  
  export const updateTaskStatusAPI = async (taskId, status) => {
    // Simulating an update call
    console.log(`Task ${taskId} updated to status: ${status}`);
    return { success: true };
  };
  