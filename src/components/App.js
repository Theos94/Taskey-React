import React from "react";
import Header from "./Header";
import InputForm from "./InputForm";
import Tasks from "./Tasks";
import Login from "./Login";
import sampleTasks from "../sample-tasks";
import base, { firebaseApp } from "../base";
import firebase from "firebase";

class App extends React.Component {
  state = {
    tasks: {},
    uid: null,
    owner: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addTask = task => {
    const tasks = { ...this.state.tasks };
    tasks[`task${Date.now()}`] = task;
    this.setState({ tasks });
  };

  toggleCompletedTask = index => {
    const tasks = { ...this.state.tasks };
    tasks[index].completed = !tasks[index].completed;
    this.setState({ tasks });
  };

  deleteAllTasks = () => {
    const tasks = { ...this.state.tasks };
    for (let key in tasks) {
      tasks[key] = null;
    }
    this.setState({ tasks });
  };

  deleteThisTask = key => {
    const tasks = { ...this.state.tasks };
    tasks[key] = null;
    this.setState({ tasks });
  };

  loadSampleTasks = () => {
    this.setState({ tasks: sampleTasks });
  };

  // Login methods and signup below

  authenticate = provider => {
    const authProvider = new firebase.auth.GoogleAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  authHandler = async authData => {
    const uid = authData.user.uid;

    const store = await base.fetch(`${uid}`, {
      context: this
    });

    if (!store.owner) {
      await firebase
        .database()
        .ref(`${uid}`)
        .set({
          tasks: {
            task1: {
              completed: false,
              task: "Log in to Taskey!"
            }
          },
          owner: uid
        });
    }

    this.ref = base.syncState(`${uid}/tasks`, {
      context: this,
      state: "tasks"
    });

    if (!store.owner) {
      await base.post(`${uid}/owner`, {
        data: authData.user.uid
      });
    }

    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logoutButton = (
      <button className="logoutBtn" onClick={this.logout}>
        LOG OUT
      </button>
    );

    // Check if logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // Check if they are not the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          Sorry, not the owner of these tasks.
          {logoutButton}
        </div>
      );
    }

    return (
      <React.Fragment>
        <Header />
        <InputForm addTask={this.addTask} />
        <Tasks
          tasks={this.state.tasks}
          toggleCompletedTask={this.toggleCompletedTask}
          deleteAllTasks={this.deleteAllTasks}
          deleteThisTask={this.deleteThisTask}
        />

        {logoutButton}
      </React.Fragment>
    );
  }
}

export default App;
