import React, { Component } from 'react';
import { addTodo } from '../Redux/Action';
import { complet } from '../Redux/Action';
import { remove } from '../Redux/Action';
import { move } from '../Redux/Action';
import { tomove } from '../Redux/Action';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
class Ui extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }
  handler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  add = () => {
    let obj = {
      id: Date.now(),
      text: this.state.name,
      isCompleted: false,
      trash: false,
    };
    if (this.state.name === '') {
      Swal.fire('Please Enter Something');
    } else {
      this.props.addTodo(obj);
      this.setState({
        name: '',
      });
    }
  };
  removeData = (id) => {
    this.props.removeTodo(id);
  };
  completTask = (id) => {
    this.props.complete(id);
  };
  moveData = (id) => {
    this.props.move(id);
  };
  tomove = (id) => {
    this.props.tomove(id);
  };

  render() {
    let completArr = [];
    let inCompletArr = [];
    let todoArr = this.props.todoArr;
    todoArr.map((ele) => {
      if (ele.isCompleted) {
        completArr.push(ele);
      } else if (!ele.trash) {
        inCompletArr.push(ele);
      }
      return ele;
    });

    let tomoveArr = [];
    todoArr.map((ele) => {
      if (ele.trash) {
        tomoveArr.push(ele);
      }
      return ele;
    });
    return (
      <>
        <div className="org">
          <nav className="col-sm navbar-dark bg-dark text-center p-3">
            <i className="fas fa-book-open bg-light fa-2x mx-4 p-1"></i>
            <span className="org" style={{ fontSize: 'large' }}>
              To Do List
            </span>
            <i className="fas fa-book-open bg-light fa-2x mx-4 p-1"></i>
            <button
              type="button"
              className="btn org org-hover float-right"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <i className="fas fa-trash-restore-alt fa-2x"></i>
            </button>
          </nav>
          <div className="">
            <div>
              <div
                className="col-sm px-0 text-center mx-auto mt-4 py-0"
                style={{ width: '350px' }}
              >
                <div
                  className="card  text-center"
                  style={{ width: '350px', borderColor: '#ff8c00' }}
                >
                  <div className="card-body">
                    <h5 className="card-title">Add To Do</h5>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={this.state.name}
                      onChange={this.handler}
                    ></input>
                    <button
                      type="button"
                      className="btn btn-dark mt-4"
                      onClick={this.add}
                    >
                      Add
                    </button>
                    <div className="text-left mt-3">
                      {inCompletArr.map((ele, i) => {
                        return (
                          <div key={ele.id} className="m-1">
                            {i === 0 ? (
                              <h4 className="text-center">Task List</h4>
                            ) : (
                              ''
                            )}
                            <div className="d-flex justify-content-between">
                              <div>
                                <input
                                  type="checkbox"
                                  aria-label="Checkbox for following text input"
                                  className="mx-2 org"
                                  onClick={() => this.completTask(ele.id)}
                                />
                                <span>{i + 1}. </span>
                                <span>{ele.text} </span>
                              </div>
                              <button
                                value={ele.id}
                                onClick={() => this.moveData(ele.id)}
                                className="btn-dark btn-hover-shadow"
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="text-left mt-3">
                      {completArr.map((ele, i) => {
                        return (
                          <div key={ele.id}>
                            {i === 0 ? (
                              <h4 className="text-center">Task Completed</h4>
                            ) : (
                              ''
                            )}
                            <div className="d-flex justify-content-between">
                              <div>
                                <span className="org-light">{i + 1}. </span>
                                <strike className="success org-light">
                                  {ele.text}
                                </strike>
                              </div>
                              <button
                                value={ele.id}
                                onClick={() => this.removeData(ele.id)}
                                className="btn-dark mt-3"
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal fade "
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className=" modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Trash
                    </h5>
                    <button
                      type="button"
                      className="close org"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="col-sm modal-body">
                    <div
                      className=" card org text-center mt-4 mx-auto"
                      style={{
                        width: 'auto',
                        height: '400px',
                        borderColor: '#ff8c00',
                      }}
                    >
                      <div>
                        <h5 className="mt-3">Move To Do</h5>
                        {tomoveArr.length ? (
                          tomoveArr.map((ele, i) => {
                            return (
                              <div
                                key={ele.id}
                                className="d-flex justify-content-between"
                              >
                                <div className="mt-3 mx-4">
                                  <span>{i + 1}. </span>
                                  <span>{ele.text} </span>
                                </div>
                                <div>
                                  <button
                                    value={ele.id}
                                    onClick={() => this.tomove(ele.id)}
                                    className="btn-dark mt-3 mx-2"
                                  >
                                    <i className="fas fa-redo"></i>
                                  </button>
                                  <button
                                    value={ele.id}
                                    onClick={() => this.removeData(ele.id)}
                                    className="btn-dark mt-3 mx-4"
                                  >
                                    <i className="fas fa-trash-alt"></i>
                                  </button>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div>
                            <img
                              src="https://cdn.dribbble.com/users/2071065/screenshots/6559618/attachments/1401970/__________46.png"
                              alt=""
                              width="300"
                            />
                            <h5 className="text-dark">Nothing to restore</h5>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn org"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  todoArr: state.arr,
});

const mapDispatchToProps = (dispatch) => ({
  addTodo: (payload) => dispatch(addTodo(payload)),
  complete: (payload) => dispatch(complet(payload)),
  removeTodo: (payload) => dispatch(remove(payload)),
  move: (payload) => dispatch(move(payload)),
  tomove: (payload) => dispatch(tomove(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ui);
