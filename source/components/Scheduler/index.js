// Core
import React, { Component, createRef } from "react";
import { connect } from "react-redux";

// Instruments
import Styles from "./styles.m.css";

// Components
import Tasks from "../Tasks";
import Spinner from "../Spinner";
import Checkbox from "../../theme/assets/Checkbox";
import { tasksActions } from "../../bus/tasks/actions";
import { uiActions } from "../../bus/ui/actions";
import { bindActionCreators } from "../../../../../Users/Sergii/AppData/Local/Microsoft/TypeScript/3.3/node_modules/redux";

const mapStateToProps = (state) => {
    return {
        isFetching:  state.ui.get("isFetching"),
        searchQuery: state.ui.get("searchQuery"),
        tasks:       state.tasks,
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
class Scheduler extends Component {
    searchInput = createRef();

    _updateSearchQuery = (event) => {
        const {
            actions: { updateSearchQuery },
        } = this.props;
        const searchQuery = event.target.value.toLowerCase();

        if (searchQuery && searchQuery.length > 0) {
            console.log(Styles);
            this.searchInput.current.classList.add(Styles.notEmpty);
        }

        updateSearchQuery(searchQuery);
    };

    render () {
        const {
            tasks,
            searchQuery,
            actions: { isFetching, markAllTasksAsDoneAsync },
        } = this.props;

        const isAllTasksDone = () =>
            tasks.every((task) => task.get("completed"));

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input
                            placeholder = 'Поиск'
                            ref = { this.searchInput }
                            type = 'search'
                            value = { searchQuery }
                            onChange = { this._updateSearchQuery }
                        />
                    </header>
                    <section>
                        <Spinner isSpinning = { isFetching } />
                        <Tasks filter = { searchQuery } />
                    </section>
                    <footer>
                        <Checkbox
                            checked = { isAllTasksDone() }
                            color1 = '#363636'
                            color2 = '#fff'
                            onClick = { markAllTasksAsDoneAsync }
                        />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}

export default Scheduler;
