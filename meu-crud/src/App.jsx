import "./App.css"

import useTasks from "./hooks/useTasks"


import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import TaskStats from "./components/TaskStats"

function App() {


  const {
    tasks,
    addTask,
    completeTask,
    removeTask,
    editTask,
  } = useTasks()



  return (
    <div className="container">
      <h1>Minha Organização</h1>


      <TaskForm addTask={addTask} />

      <TaskStats tasks={tasks}/>

      <TaskList
        tasks={tasks}
        completeTask={completeTask}
        removeTask={removeTask}
        editTask={editTask}
      />



    </div>
  )
}

export default App