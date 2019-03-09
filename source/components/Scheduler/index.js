// Core
import React, { Component } from "react";
import { connect } from "react-redux";

// Instruments
import Styles from "./styles.m.css";

// Components
import Task from "../Task";
import Checkbox from "../../theme/assets/Checkbox";

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
    };
};

@connect(mapStateToProps)
export default class Scheduler extends Component {
    // _addTask = (event) => {
    //     event.preventDefault();
    //     const taskMessage = event.currentTarget.elements.task.value;

    //     if (taskMessage.trim().length > 0) {
    //         const newTask = {
    //             id:        "qweqw",
    //             completed: false,
    //             favorite:  false,
    //         };

    //         newTask.message = taskMessage;

    //         tasks.push(newTask);
    //     }
    // };

    render() {
        const { tasks } = this.props;
        console.log("tasks: ", tasks);
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
            <section className={Styles.scheduler}>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder="Поиск" type="search" />
                    </header>
                    <section>
                        <form onSubmit={this._addTask}>
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
                    </section>
                    <footer>
                        <Checkbox checked color1="#363636" color2="#fff" />
                        <span className={Styles.completeAllTasks}>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
