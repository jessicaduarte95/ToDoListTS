import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styles from './TaskForm.module.css';
import { ITask } from "../interfaces/Task";

interface Props {
    btnText: string;
    taskList: ITask[];
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
    task?: ITask | null;
}

const TaskForm = ({ btnText, taskList, setTaskList, task }: Props) => {

    const [id, setId] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [difficulty, setDifficulty] = useState<number>(0);

    const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = Math.floor(Math.random() * 1000);
        const newTask: ITask = { id, title, difficulty };
        setTaskList!([...taskList, newTask]);
        setTitle("");
        setDifficulty(0);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "title") {
            setTitle(e.target.value);
        } else if (e.target.name === "difficulty") {
            setDifficulty(parseInt(e.target.value));
        }
    }

    useEffect(() => {
        if (task) {
            setId(task.id);
            setTitle(task.title);
            setDifficulty(task.difficulty);
        }
    }, [task]);

    return (
        <form onSubmit={addTaskHandler} className={styles.form}>
            <div className={styles.input_container}>
                <label htmlFor="title">Título</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    placeholder="Título da Tarefa"
                    onChange={handleChange}
                />
            </div>
            <div className={styles.input_container}>
                <label htmlFor="difficulty">Dificuldade</label>
                <input
                    type="text"
                    value={difficulty}
                    name="difficulty"
                    placeholder="Dificuldade da Tarefa"
                    onChange={handleChange}
                />
            </div>
            <input type="submit" value={btnText} />
        </form>
    )
}

export default TaskForm;