import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8080/'
});

export const getTasks = () => {

  return client
    .get( `/get_tasks`)
    .then ((response) => {
      const allTasks = response.data.data.message;
      return allTasks;
    })
    .catch(error => console.error(`Error: ${error}`));
};

export const createTask = (taskname, isDone) => {
  return client
    .post( '/create_task', 
    {
      taskname: taskname,
      isDone: isDone
    });
};

export const updateTask= (taskname, isDone) => {
  return client
    .put( '/update_task',
    {
      taskname: taskname,
      isDone: isDone
    });
};

export const deleteTask = (taskname) => {
  return client
    .delete( '/delete_task', 
    { data: { taskname: taskname } });
};