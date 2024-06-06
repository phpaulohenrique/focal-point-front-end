'use client'
import styles from './page.module.css'
import { Header } from '@/components/header'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { Task } from '@/models/task'
import { updateTask } from '@/api/update-task'
import { AddTaskDialog } from '@/components/add-task-dialog'
import { DeleteTaskDialog } from '@/components/delete-task-dialog'
import { CustomCheckbox } from '@/components/checkbox'

export default function Home() {
    const [tasks, setTasks] = useState<Array<Task>>([])
    const finishedTasks = tasks.filter((task) => task.completed === true)
    const pendingTasks = tasks.filter((task) => task.completed === false)

    const getTasks = async () => {
        try {
            const response = await api.get('/tasks')
            setTasks(response.data)
        } catch (error) {
            console.error('Error fetching tasks:', error)
        }
    }

    useEffect(() => {
        getTasks()
    }, [])

    const handleUpdateTask = async (selectedTask: Task) => {
        const taskIndex = tasks.findIndex((task) => task.id === selectedTask.id)
        // selectedTask.completed = !selectedTask.completed
        const updatedTask = await updateTask(selectedTask)
        console.log(updatedTask)

        if (taskIndex > -1 && updatedTask) {
            const updatedTasks = [...tasks]
            // updatedTasks[taskIndex].completed = !updatedTasks[taskIndex].completed
            // updatedTasks[taskIndex].completed = task.completed
            updatedTasks[taskIndex] = updatedTask
            setTasks(updatedTasks)
        }
    }

    const onAddNewTaskToList = async (task: Task) => {
        setTasks(() => [...tasks, task])
    }

    const onRemoveTaskFromList = async (selectedTask: Task) => {
        const updatedTasks = tasks.filter((task) => task.id !== selectedTask.id)
        setTasks(updatedTasks)
    }

    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.containerTasks}>
                        <strong className={styles.tasksTitle}>Suas tarefas de hoje</strong>

                        <ul className={styles.taskList}>
                            {pendingTasks.map((task) => (
                                <li className={styles.taskItem} key={task.id}>
                                    <div>
                                        {/* <input
                                            type="checkbox"
                                            id={`task-${task.id}`}
                                            name="tarefa"
                                            onClick={() =>
                                                handleUpdateTask({ ...task, completed: true })
                                            }
                                        /> */}
                                        <CustomCheckbox
                                            // type="checkbox"
                                            id={`task-${task.id}`}
                                            key={task.id}
                                            name="tarefa"
                                            onClick={() =>
                                                handleUpdateTask({ ...task, completed: true })
                                            }
                                        />
                                        <label htmlFor={`task-${task.id}`}>{task.title}</label>
                                    </div>
                                    <DeleteTaskDialog
                                        onRemoveTaskFromList={onRemoveTaskFromList}
                                        selectedTask={task}
                                        key={task.id}
                                    />
                                </li>
                            ))}
                        </ul>

                        <strong className={styles.tasksTitle}>Tarefas finalizadas</strong>

                        <ul className={styles.taskList}>
                            {finishedTasks.map((task) => (
                                <li className={styles.taskItem} key={task.id}>
                                    <div>
                                        {/* <input
                                            type="checkbox"
                                            id={`task-${task.id}`}
                                            name="tarefa"
                                            defaultChecked
                                            onChange={() =>
                                                handleUpdateTask({ ...task, completed: false })
                                            }
                                        /> */}
                                        <CustomCheckbox
                                            // type="checkbox"
                                            key={task.id}
                                            defaultChecked
                                            id={`task-${task.id}`}
                                            name="tarefa"
                                            onClick={
                                                () =>
                                                    handleUpdateTask({ ...task, completed: false })
                                                // onChange={() =>
                                                //     handleUpdateTask({ ...task, completed: true })
                                            }
                                        />
                                        <label
                                            className={styles.taskFinishedTitle}
                                            title={task.title}
                                            htmlFor={`task-${task.id}`}
                                        >
                                            {task.title}
                                        </label>
                                    </div>

                                    <DeleteTaskDialog
                                        onRemoveTaskFromList={onRemoveTaskFromList}
                                        selectedTask={task}
                                        key={task.id}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <AddTaskDialog onAddNewTaskToList={onAddNewTaskToList} />
                </div>
            </main>
        </>
    )
}
