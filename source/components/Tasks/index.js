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
    _createTask = (event) => {
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
        const { tasks } = this.props;

        const todoList = tasks.map((task) => (
            <Task
                completed={task.get("completed")}
                favorite={task.get("favorite")}
                id={task.get("id")}
                key={task.get("id")}
                message={task.get("message")}
                {...task}
            />
        ));

        return (
            <>
                <form onSubmit={this._createTask}>
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
