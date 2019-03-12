// Core
import React, { PureComponent } from "react";
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
    render () {
        const {
            message,
            completed,
            favorite,
            onRemoveTask,
            onToggleTaskCompletedState,
            onToggleTaskFavoriteState,
        } = this.props;

        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
        });

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
                    <input disabled type = 'text' value = { message } />
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
                        onClick = { () => console.log("updateTaskMessageOnClick") }
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
