// Core
import React, { Component } from "react";
import { connect } from "react-redux";

// Instruments
import Styles from "./../Scheduler/styles.m.css";

// Components
import Task from "../Task";
import { tasksActions } from "./../../bus/tasks/actions";

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
    };
};

const mapDispatchToProps = tasksActions;

@connect(
    mapStateToProps,
    mapDispatchToProps
)
export default class Scheduler extends Component {
    _createTaskAsync = (event) => {
        event.preventDefault();
        const taskMessage = event.currentTarget.elements.task.value;

        if (taskMessage.trim().length > 0) {
            const { createTaskAsync } = this.props;
            createTaskAsync(taskMessage);
        }
    };

    componentDidMount = () => {
        const { fillTasksAsync } = this.props;
        fillTasksAsync();
    };

    render() {
        const { tasks, deleteTaskAsync } = this.props;

        const todoList = tasks.map((task) => {
            const taskId = task.get("id");
            return (
                <Task
                    completed={task.get("completed")}
                    favorite={task.get("favorite")}
                    id={taskId}
                    key={taskId}
                    message={task.get("message")}
                    onRemoveTask={() => deleteTaskAsync(taskId)}
                    {...task}
                />
            );
        });

        return (
            <>
                <form onSubmit={this._createTaskAsync}>
                    <input
                        className={Styles.createTask}
                        maxLength={50}
                        name="task"
                        placeholder="Описание моей новой задачи"
                        type="text"
                    />
                    <button>Добавить задачу</button>
                </form>
                <div className={Styles.overlay}>
                    <ul>{todoList}</ul>
                </div>
            </>
        );
    }
}
