// Core
import React, { Component } from "react";
import { connect } from "react-redux";

// Instruments
import Styles from "./styles.m.css";

// Components
import Tasks from "../Tasks";
import Spinner from "../Spinner";
import Checkbox from "../../theme/assets/Checkbox";

const mapStateToProps = (state) => {
    return {
        isFetching: state.ui.get("isFetching"),
    };
};

@connect(mapStateToProps)
export default class Scheduler extends Component {
    render() {
        const { isFetching } = this.props;
        return (
            <section className={Styles.scheduler}>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder="Поиск" type="search" />
                    </header>
                    <section>
                        <Spinner isSpinning={isFetching} />
                        <Tasks />
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
