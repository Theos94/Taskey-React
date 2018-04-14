import React from "react";
import PropTypes from "prop-types";

class Task extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      task: PropTypes.string,
      completed: PropTypes.bool
    }),
    index: PropTypes.string
  };

  toggleCompleted = () => {
    this.props.toggleCompletedTask(this.props.index);
  };

  deleteTask = () => {
    this.props.deleteThisTask(this.props.index);
  };

  render() {
    const { task, completed } = this.props.details;

    if (!completed) {
      return (
        <li className="task__item">
          <div className="task__item--text" onClick={this.toggleCompleted}>
            {task.trim()}
          </div>

          <div className="task__item--icons" onClick={this.deleteTask}>
            <i className="far fa-times-circle" />
          </div>
        </li>
      );
    } else {
      return (
        <li className="task__item">
          <div
            className="task__item--text task__completed"
            onClick={this.toggleCompleted}
          >
            {task.trim()}
          </div>

          <div onClick={this.deleteTask}>
            <i className="far fa-times-circle" />
          </div>
        </li>
      );
    }
  }
}

export default Task;
