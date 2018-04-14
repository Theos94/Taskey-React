import React from "react";
import Task from "./Task";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class Tasks extends React.Component {
  static propTypes = {
    deleteAllTasks: PropTypes.func,
    toggleCompletedTask: PropTypes.func,
    deleteThisTask: PropTypes.func,
    tasks: PropTypes.object
  };

  render() {
    return (
      <div className="tasks">
        <div className="tasks__header">
          <h4>TASKS</h4>
          <h4 onClick={this.props.deleteAllTasks}>DELETE ALL</h4>
        </div>

        <TransitionGroup component="ul" className="tasks__list">
          {Object.keys(this.props.tasks).map(key => (
            <CSSTransition
              classNames="task"
              key={key}
              timeout={{ enter: 1000, exit: 1400 }}
            >
              <Task
                key={key}
                index={key}
                details={this.props.tasks[key]}
                toggleCompletedTask={this.props.toggleCompletedTask}
                deleteThisTask={this.props.deleteThisTask}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
}

export default Tasks;
