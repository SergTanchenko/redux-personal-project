// Core
import React, { PureComponent, createRef } from "react";
import cx from "classnames";

// Instruments
import Styles from "./styles.m.css";

// Components
import Checkbox from "../../theme/assets/Checkbox";
import Remove from "../../theme/assets/Remove";
import Edit from "../../theme/assets/Edit";
import Star from "../../theme/assets/Star";

export default class Task extends PureComponent {
    componentDidUpdate = () => {
        this.inputEl.current.focus();
    };

    inputEl = createRef();

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

        const _onChangeHandler = () => {
            const updatedMessage = this.inputEl.current.value;

            updateEditedMessage({ updatedMessage });
        };

        const _onKeyDownHandler = (event) => {
            if (event.keyCode === 13) {
                const updatedMessage = this.inputEl.current.value;

                onTaskMessageSave(updatedMessage);
                startEditing();
            }
        };

        return (
            <div className = { styles } key = { id }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = { () => onToggleTaskCompletedState(!completed) }
                    />
                    <input
                        disabled = { !isEditMode }
                        maxLength = { 50 }
                        ref = { this.inputEl }
                        type = 'text'
                        value = { currentMessage }
                        onChange = { _onChangeHandler }
                        onKeyDown = { _onKeyDownHandler }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
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
            </div>
        );
    }
}
