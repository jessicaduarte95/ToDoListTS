import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from './App.module.css'
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Modal from './components/Modal';
import { ITask } from './interfaces/Task';

function App() {

  const [taskList, setTaskList] = useState<ITask[]>([]);

  const deleteTask = (id: number) => {
    setTaskList(taskList.filter(task => {
      return task.id !== id
    }));
  };

  const hideOrShowModal = (display: boolean) => {
    const modal = document.getElementById("modal")
    if (display) {
      modal!.classList.remove("hide");
    } else {
      modal!.classList.add("hide");
    }
  }

  const editTask = (): void => {
    hideOrShowModal(true);
  }

  return (
    <div>
      <Modal children={<TaskForm btnText="Editar Tarefa" taskList={taskList} setTaskList={setTaskList} />} />
      <Header />
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer ?</h2>
          <TaskForm btnText="Criar Tarefa" taskList={taskList} setTaskList={setTaskList} />
        </div>
        <div>
          <h2>Suas Tarefas: </h2>
          <TaskList
            taskList={taskList}
            handleDelete={deleteTask}
            handleEdit={editTask}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
