// Core
import React, { PureComponent, createRef } from "react";
import { connect } from "react-redux";
import cx from "classnames";

// Instruments
import Styles from "./styles.m.css";

// Components
import Checkbox from "../../theme/assets/Checkbox";
import Remove from "../../theme/assets/Remove";
import Edit from "../../theme/assets/Edit";
import Star from "../../theme/assets/Star";

export default class Task extends PureComponent {
    inputEl = createRef();

    componentDidUpdate () {
        this.inputEl.current.focus();
    }

    render () {
        const {
            id,
            message,
            completed,
            favorite,
            onRemoveTask,
            onToggleTaskCompletedState,
            onToggleTaskFavoriteState,
            startEditing,
            editingTask,
        } = this.props;

        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
        });

        const isEditMode = editingTask && editingTask.get("id") === id;

        console.log("EDITING!!!!: ", isEditMode);
        const onToggleEditingMode = () => {
            startEditing(id, message);
        };

        return (
            <li className = { styles }>
                <div className = { Styles.content }>
                    <Checkbox
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        inlineBlock
                        onClick = { onToggleTaskCompletedState }
                    />
                    <input
                        disabled = { !isEditMode }
                        ref = { this.inputEl }
                        type = 'text'
                        value = { message }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        checked = { favorite }
                        inlineBlock
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { onToggleTaskFavoriteState }
                    />
                    <Edit
                        inlineBlock
                        checked = { false }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { onToggleEditingMode }
                    />
                    <Remove
                        inlineBlock
                        className = { Styles.removeTask }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { onRemoveTask }
                    />
                </div>
            </li>
        );
    }
}
