// Core
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Instruments
import Styles from "./../Scheduler/styles.m.css";

// Components
import Task from "../Task";
import { tasksActions } from "./../../bus/tasks/actions";
import { uiActions } from "./../../bus/ui/actions";

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        editingTask: state.ui.get("editingTask"),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            { ...tasksActions, ...uiActions },
            dispatch
        ),
    };
};

@connect(
    mapStateToProps,
    mapDispatchToProps
)
export default class Tasks extends Component {
    _createTaskAsync = (event) => {
        event.preventDefault();
        const taskMessage = event.currentTarget.elements.task.value;

        if (taskMessage.trim().length > 0) {
            const { actions } = this.props;
            actions.createTaskAsync(taskMessage);
        }
    };

    componentDidMount = () => {
        const { actions } = this.props;
        actions.fillTasksAsync();
    };

    render() {
        const {
            tasks,
            editingTask,
            actions: {
                deleteTaskAsync,
                updateTaskAsync,
                startEditing,
                stopEditing,
            },
        } = this.props;

        const toggleTaskState = (task, updatedProperty) => {
            const updatedTask = task.set(
                updatedProperty,
                !task.get(updatedProperty)
            );

            updateTaskAsync({ updatedTask, updatedProperty });
        };

        const todoList = tasks.map((task) => {
            const taskId = task.get("id");
            return (
                <Task
                    completed={task.get("completed")}
                    favorite={task.get("favorite")}
                    id={taskId}
                    key={taskId}
                    message={task.get("message")}
                    onToggleTaskCompletedState={() =>
                        toggleTaskState(task, "completed")
                    }
                    onToggleTaskFavoriteState={() =>
                        toggleTaskState(task, "favorite")
                    }
                    startEditing={startEditing}
                    stopEditing={stopEditing}
                    editingTask={editingTask}
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
