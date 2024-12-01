import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kanban-tasks');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, title: 'Research competitors', status: 'todo' },
      { id: 2, title: 'Design landing page', status: 'in-progress' },
      { id: 3, title: 'Setup database', status: 'done' }
    ];
  });
  
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
  };

  const handleDrop = (e, status) => {
    const id = e.dataTransfer.getData('id');
    setTasks(tasks.map(t => {
      if (t.id.toString() === id) {
        return { ...t, status };
      }
      return t;
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: newTask, status: 'todo' }]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const columns = [
    { title: 'To Do', id: 'todo' },
    { title: 'In Progress', id: 'in-progress' },
    { title: 'Done', id: 'done' }
  ];

  return (
    <div className="kanban-container">
      <header className="kanban-header">
        <h1>Kanban Pro</h1>
        <p>A beautiful drag-and-drop task board powered by React.</p>
        <form onSubmit={addTask} className="add-task-form">
          <input 
            type="text" 
            placeholder="What needs to be done?" 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>
      </header>
      
      <div className="board">
        {columns.map(col => (
          <div 
            key={col.id}
            className="column"
            onDrop={(e) => handleDrop(e, col.id)}
            onDragOver={handleDragOver}
          >
            <h2>{col.title} <span className="count">{tasks.filter(t => t.status === col.id).length}</span></h2>
            <div className="task-list">
              {tasks.filter(t => t.status === col.id).map(task => (
                <div 
                  key={task.id} 
                  className="task-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                >
                  <p>{task.title}</p>
                  <button onClick={() => deleteTask(task.id)} className="delete-btn">×</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
