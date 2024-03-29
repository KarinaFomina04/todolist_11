import React, {ChangeEvent, memo, useCallback, useMemo} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";
import {OverridableStringUnion} from "@mui/types";
import {ButtonWithMemo} from "./ButtonWithMemo";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {

    let tasks = props.tasks

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id),[props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id),[props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id),[props.changeFilter, props.id]);

    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.id), [props.removeTask, props.id])
    const changeTaskStatus = useCallback((taskId: string, newIsDoneValue: boolean) => {
        props.changeTaskStatus(taskId, newIsDoneValue, props.id);
    }, [props.changeTaskStatus, props.id])
    const changeTaskTitle = useCallback((taskId: string, newValue: string) => {
        props.changeTaskTitle(taskId, newValue, props.id);
    }, [props.changeTaskTitle, props.id])

    useMemo(()=> {
        if (props.filter === "active") {
            tasks = tasks.filter(t => t.isDone === false);
        }
        if (props.filter === "completed") {
            tasks = tasks.filter(t => t.isDone === true);
        }
        return tasks
    }, [props.filter])


    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    return <Task
                        key={t.id}
                        task={t}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                    />
                })
            }
        </div>
        <div style={{ paddingTop: "10px"}}>
            <ButtonWithMemo
                color={'inherit'}
                title={"All"}
                variant={props.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}/>
            <ButtonWithMemo
                title={"Active"}
                variant={props.filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}
                color={'primary'}/>
            <ButtonWithMemo
                title={"Completed"}
                variant={props.filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}
                color={'secondary'}/>

        </div>
    </div>
})


