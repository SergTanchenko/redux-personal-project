// Core
import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Control } from "react-redux-form";
import { bindActionCreators } from "redux";

// Instruments
import posed, { PoseGroup } from "react-pose";
import Styles from "./../Scheduler/styles.m.css";
import { sortTasks } from "./../../instruments/helpers";

// Components
import Task from "../Task";
import { tasksActions } from "./../../bus/tasks/actions";
import { uiActions } from "./../../bus/ui/actions";

const Item = posed.li({});

const mapStateToProps = (state) => {
    return {
        tasks:       sortTasks(state.tasks),
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
class Tasks extends Component {
    componentDidMount = () => {
        const { actions } = this.props;

        actions.fillTasksAsync();

        document.addEventListener(
            "keydown",
            this._onEscapeClickedHandler,
            false
        );
    };

    componentWillUnmount = () => {
        document.removeEventListener(
            "keydown",
            this._onEscapeClickedHandler,
            false
        );
    };

    _createTaskAsync = ({ newTask }) => {
        if (newTask && newTask.trim().length > 0) {
            const { actions } = this.props;

            actions.createTaskAsync(newTask);
        }
    };

    _onEscapeClickedHandler = (event) => {
        if (event.keyCode === 27) {
            const {
                actions: { stopEditing },
            } = this.props;

            stopEditing();
        }
    };

    render () {
        const {
            tasks,
            filter,
            editingTask,
            actions: {
                deleteTaskAsync,
                updateTaskAsync,
                startEditing,
                stopEditing,
                updateEditedMessage,
            },
        } = this.props;

        const _updateTaskAsync = (task, updatedProperty, newValue) => {
            const updatedTask = task.set(updatedProperty, newValue);

            updateTaskAsync({ updatedTask });
        };

        const todoList = tasks
            .filter((task) =>
                task
                    .get("message")
                    .toLowerCase()
                    .includes(filter)
            )
            .map((task) => {
                const taskId = task.get("id");

                return (
                    <Item key = { taskId }>
                        <Task
                            completed = { task.get("completed") }
                            editingTask = { editingTask }
                            favorite = { task.get("favorite") }
                            id = { taskId }
                            key = { taskId }
                            message = { task.get("message") }
                            startEditing = { startEditing }
                            stopEditing = { stopEditing }
                            updateEditedMessage = { updateEditedMessage }
                            onRemoveTask = { () => deleteTaskAsync(taskId) }
                            onTaskMessageSave = { (newValue) =>
                                _updateTaskAsync(task, "message", newValue)
                            }
                            onToggleTaskCompletedState = { (newValue) =>
                                _updateTaskAsync(task, "completed", newValue)
                            }
                            onToggleTaskFavoriteState = { (newValue) =>
                                _updateTaskAsync(task, "favorite", newValue)
                            }
                            { ...task }
                        />
                    </Item>
                );
            });

        return (
            <>
                <Form model = 'forms.addTask' onSubmit = { this._createTaskAsync }>
                    <Control.input
                        className = { Styles.createTask }
                        maxLength = { 50 }
                        model = '.newTask'
                        placeholder = 'Описание моей новой задачи'
                        type = 'text'
                    />
                    <button>Добавить задачу</button>
                </Form>

                <div className = { Styles.overlay }>
                    <ul>
                        <PoseGroup>{todoList}</PoseGroup>
                    </ul>
                </div>
            </>
        );
    }
}

export default Tasks;
