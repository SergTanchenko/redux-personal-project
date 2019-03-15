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
            onTaskMessageSave,
            stopEditing,
            editingTask,
            updateEditedMessage,
        } = this.props;

        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
        });

        const isEditMode = editingTask.get("id") === id;

        const _onToggleEditingMode = () => {
            isEditMode ? stopEditing() : startEditing(id, message);
        };

        let currentMessage = message;

        if (isEditMode) {
            currentMessage = editingTask.get("updatedMessage");
        }

        const _onChangeHandler = (event) => {
            const updatedMessage = this.inputEl.current.value;

            updateEditedMessage({ updatedMessage });
        };

        const _onKeyDownHandler = (event) => {
            const updatedMessage = this.inputEl.current.value;

            if (event.keyCode === 13) {
                onTaskMessageSave(updatedMessage);
                startEditing();
            }
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
                        onClick = { () => onToggleTaskCompletedState(!completed) }
                    />
                    <input
                        disabled = { !isEditMode }
                        onChange = { _onChangeHandler }
                        onKeyDown = { _onKeyDownHandler }
                        ref = { this.inputEl }
                        type = 'text'
                        value = { currentMessage }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        checked = { favorite }
                        inlineBlock
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { () => onToggleTaskFavoriteState(!favorite) }
                    />
                    <Edit
                        inlineBlock
                        checked = { false }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { _onToggleEditingMode }
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
