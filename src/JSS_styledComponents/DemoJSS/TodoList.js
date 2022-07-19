import React, { Component } from 'react';
import { Container } from '../Components/Container';
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, themeArr } from '../Themes/configTheme';
import { Dropdown } from '../Components/Dropdown';
import { Heading1, Heading2 } from '../Components/Heading';
import { Label, TextField } from '../Components/TextField';
import { Button } from '../Components/Button';
import { Table, Tbody, Th, Thead, Tr } from '../Components/Table';
import { connect } from "react-redux"
import { addTaskAction, changeThemeAction, checkDeleteTaskAction, checkDoneTaskAction, checkUnDoneTaskAction, GetTaskEditAction, putTaskEditAction } from '../redux/Action/Action';

class TodoList extends Component {

  state = {
    taskName: "",
    error: "",
    valid: false,
    updateBtnStatus: false,
    addBtnStatus: true
  };

  renderTaskToDo = () => {
    return this.props.taskList.filter(task => !task.status).map((task, index) => {
      return <Tr style={{ height: 70 }} key={index}>
        <Th style={{ verticalAlign: "middle", textAlign: "left" }}>{task.taskName}</Th>
        <Th className='text-right'>
          <Button className='mx-2'
            onClick={() => { this.props.checkDoneTask(task.id) }}
          ><i className='fa fa-check'></i></Button>

          <Button className='mx-2'
            onClick={() => {
              this.props.getTaskEdit(task);
              this.setState({
                updateBtnStatus: true,
                addBtnStatus: false
              });
            }}
          ><i className='fa fa-edit'></i></Button>

          <Button className='mx-2'><i className='fa fa-trash'
            onClick={() => { this.props.checkDeleteTask(task.id) }}
          ></i></Button>
        </Th>
      </Tr>
    })
  };

  renderTaskDone = () => {
    return this.props.taskList.filter(task => task.status).map((task, index) => {
      return <Tr style={{ height: 70 }} key={index}>
        <Th style={{ verticalAlign: "middle", textAlign: "left" }}>{task.taskName}</Th>
        <Th className='text-right'>
          <Button className='mx-2'><i className='fa fa-rotate-left'
            onClick={() => { this.props.checkUndoneTask(task.id) }}
          ></i></Button>
          <Button className='mx-2'><i className='fa fa-trash'
            onClick={() => { this.props.checkDeleteTask(task.id) }}
          ></i></Button>
        </Th>
      </Tr>
    })
  };

  checkValid = () => {
    if (this.state.error !== "" || this.state.taskName.trim() === "") {
      this.state.valid = false
    };
  };

  handleChange = (event) => {
    let { name, value } = event.target;

    let errorMessage = "";
    if (value.trim() === "") {
      errorMessage = name + " is required!"
    };

    this.setState({
      taskName: value,
      error: errorMessage
    }, () => {
      console.log(this.state);
      this.checkValid();
    });
  };

  handleAddTask = () => {
    if (this.state.valid) {
      let index = this.props.taskList.findIndex((task) => {
        return task.taskName === this.state.taskName
      });
      if (index !== -1) {
        alert("Task name is already exists!")
      } else {
        let newTask = {
          id: Date.now(),
          taskName: this.state.taskName,
          status: false
        };
        this.props.addTask(newTask);
      }
    } else {

      alert("Please fill all required information!")
    };
  };

  handleChangeTheme = (event) => {
    this.props.changeTheme(event.target.value);
  };

  renderTheme = () => {
    return themeArr.map((theme, index) => {
      return <option value={theme.id}>{theme.name}</option>
    });
  };

  // componentWillReceiveProps (newProps) {
  //   this.setState({
  //     taskName: newProps.taskEdit.taskName
  //   });
  // };

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <Container>
          <Dropdown onChange={(e) => { this.handleChangeTheme(e) }}>
            {this.renderTheme()}
          </Dropdown>
          <Heading1 style={{ fontWeight: "bold" }}>To-do List</Heading1>
          <TextField value={this.state.taskName} name='taskName' label="Task Name " onChange={(e) => { this.handleChange(e) }} />

          {
            this.state.addBtnStatus ? <Button
              className='ml-2'
              onClick={(e) => { this.handleAddTask(e) }}
            >
              <i className='fa fa-plus'></i>
              Add Task</Button> :
              <Button
                className='ml-2'
                disabled
                onClick={(e) => { this.handleAddTask(e) }}
              >
                <i className='fa fa-plus'></i>
                Add Task</Button>
          }

          {
            this.state.updateBtnStatus ? <Button className='ml-2'
              onClick={() => {
                this.props.putTaskEdit(this.state.taskName);
                this.setState({
                  taskName: "",
                  updateBtnStatus: false,
                  addBtnStatus: true
                });
              }}
            ><i className='fa fa-upload'></i> Update Task</Button> :
              <Button className='ml-2'
                disabled
                onClick={() => {
                  this.props.putTaskEdit(this.state.taskName);
                  this.setState({
                    taskName: ""
                  });
                }}
              ><i className='fa fa-upload'></i> Update Task</Button>
          }
          <p className='text text-danger text-center my-2'>{this.state.error}</p>
          <hr />

          <Heading1 style={{ fontWeight: "bold" }}>Task To Do</Heading1>
          <Table>
            <Thead>
              {this.renderTaskToDo()}
            </Thead>
          </Table>
          <hr />

          <Heading1 style={{ fontWeight: "bold" }}>Task Done</Heading1>
          <Table>
            <Thead>
              {this.renderTaskDone()}
            </Thead>
          </Table>
        </Container>

      </ThemeProvider>
    )
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
      this.setState({
        taskName: this.props.taskEdit.taskName
      })
    }
  }
};

let mapStateToProps = (state) => {
  return {
    theme: state.TodoListJSSReducer.theme,
    taskList: state.TodoListJSSReducer.taskList,
    taskEdit: state.TodoListJSSReducer.taskEdit
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    changeTheme: (theme) => {
      dispatch(changeThemeAction(theme))
    },
    addTask: (task) => {
      dispatch(addTaskAction(task))
    },
    checkDoneTask: (id) => {
      dispatch(checkDoneTaskAction(id))
    },
    checkUndoneTask: (id) => {
      dispatch(checkUnDoneTaskAction(id))
    },
    checkDeleteTask: (id) => {
      dispatch(checkDeleteTaskAction(id))
    },
    getTaskEdit: (task) => {
      dispatch(GetTaskEditAction(task))
    },
    putTaskEdit: (task) => {
      dispatch(putTaskEditAction(task))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
