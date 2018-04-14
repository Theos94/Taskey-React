import React from "react";
import PropTypes from "prop-types";

class InputForm extends React.Component {
  static propTypes = {
    addTask: PropTypes.func
  };

  taskRef = React.createRef();

  createTask = e => {
    e.preventDefault();

    const task = {
      task: this.taskRef.current.value,
      completed: false
    };

    this.props.addTask(task);

    e.currentTarget.reset();
  };

  render() {
    return (
      <form id="inputForm" onSubmit={this.createTask}>
        <input
          ref={this.taskRef}
          name="task"
          type="text"
          className="inputField"
          placeholder="e.g: Learn Vue..."
          required
        />
        <button type="submit" className="inputBtn">
          ADD TASK
        </button>
      </form>
    );
  }
}

export default InputForm;
