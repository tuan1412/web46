import React, { Component } from 'react';
import './App.css';

function generateRandomId() {
  return "todo-" + new Date().getTime();
}

function saveToLocalStorage(toDoList) {
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

class App extends Component {
  constructor(props) {
    super(props);
    const todoListStorage = localStorage.getItem('toDoList');

    this.state = {
      content: '',
      todoList: todoListStorage ? JSON.parse(todoListStorage) : []
    }
  }

  onChangeInput = (e) => {
    this.setState({ content: e.target.value })
  }

  onSubmitForm = (e) => {
    e.preventDefault();

    const content = this.state.content;

    if (content === "") {
      return alert("You have input what you have to do")
    }

    const id = generateRandomId();

    const toDo = {
      id,
      content,
      isCompleted: false,
      isChecked: false
    };

    this.setState((prevState) => {
      let { todoList } = prevState;

      todoList = todoList.concat(toDo)
      saveToLocalStorage(todoList);

      return {
        content: '',
        todoList,
      }
    })
  }

  checkToDo = (id) => {
    const newTodoList = this.state.todoList.map(toDo => {
      if (toDo.id !== id) return toDo;

      return { ...toDo, isChecked: !toDo.isChecked }
    });

    saveToLocalStorage(newTodoList);

    this.setState({ todoList: newTodoList })
  }

  deleteToDo = (id) => {
    const newTodoList = this.state.todoList.map(toDo => {
      if (toDo.id !== id) return toDo;

      return { ...toDo, isCompleted: true}
    });
    saveToLocalStorage(newTodoList);


    this.setState({ todoList: newTodoList })
  }

  showToDoList = () => {
    return this.state.todoList.map(toDo => {
      if (toDo.isChecked && !toDo.isCompleted) {
        return (
          <li 
            onClick={() => this.checkToDo(toDo.id)} 
            id={toDo.id} 
            key={toDo.id} 
            className="checked"
          >
            {toDo.content}
            <span 
              onClick={(e) => {
                e.stopPropagation();
                this.deleteToDo(toDo.id)
              }}
              className="close"
            >
              x
            </span>
          </li>
        )
      }
      if (!toDo.isCompleted) {
        return (
          <li 
            onClick={() => this.checkToDo(toDo.id)} 
            id={toDo.id} 
            key={toDo.id}
          >
            {toDo.content}
            <span 
              onClick={(e) => {
                e.stopPropagation()
                this.deleteToDo(toDo.id)
              }}
              className="close"
            >
              x
            </span>
          </li>
        )
      }
      return null;
    })
  }

  render() {
    return (
      <div className="App">
        <form id="form-add-to-do" className="header" onSubmit={this.onSubmitForm}>
          <h2 style={{ margin: 10 }}>My To Do List</h2>
          <div className="add-to-do-group">
            <input
              value={this.state.content}
              onChange={this.onChangeInput}
              type="text"
              name="content"
              id="to-do-content"
              placeholder="Title..."
            />
            <button type="submit" className="btn-add-to-do">
              Add
            </button>
          </div>
        </form>
  
        <ul id="to-do-list">
          {this.showToDoList()}
        </ul>
      </div>
    );
  }
}

export default App;
