import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deleteTodoAction,
  editTodoAction,
  getTodoAction,
} from "../../actions/todoActions";

function TodoList(props) {
  const dispatch = useDispatch();
  let history = useHistory();
  const getTodo = useSelector((state) => state.getTodo);
  const addTodo = useSelector((state) => state.addTodo);
  const deleteTodo = useSelector((state) => state.deleteTodo);
  const editTodo = useSelector((state) => state.editTodo);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [data, setData] = useState({
    _id: "",
    todoTitle: "",
    description: "",
    complete: false,
  });
  const [tokenError, setError] = useState();
  const { successDelete, errorDelete } = deleteTodo;
  const { successEdit, errorEdit } = editTodo;
  const { success } = addTodo;
  const { todos } = getTodo;

  useEffect(() => {
    dispatch(getTodoAction());
  }, [dispatch, success, successDelete, successEdit]);

  const handleDelete = (id) => {
    dispatch(deleteTodoAction(id));
    window.reload();
  };
  const handleEdit = (item) => {
    setData((previus) => ({
      ...previus,
      _id: item._id,
      todoTitle: item.title,
      description: item.description,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { todoTitle, description, _id } = data;
    if (!!todoTitle && !!description) {
      dispatch(editTodoAction(todoTitle, description, _id));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="card p-4 mt-4">
      <h4>Todos List </h4>
      {(tokenError || errorDelete) && (
        <div class="alert alert-danger" role="alert">
          You'r not authanticate to delete the todo please try to login first
        </div>
      )}
      {todos?.map((item) => (
        <ol className="list-group list-group-numbered " key={item.id}>
          <li
            className={`list-group-item ${
              item.complete ? "green-color" : "blue-color"
            } `}
          >
            <strong>Title: </strong>
            {item.title} <strong>description:</strong>
            {item.description}
            <button
              className="btn btn-danger"
              onClick={(e) => handleDelete(item._id)}
            >
              Delete
            </button>
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={(e) => handleEdit(item)}
            >
              Edit
            </button>
          </li>
        </ol>
      ))}
      {!!data && (
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              {tokenError && (
                <div class="alert alert-danger" role="alert">
                  {tokenError}
                </div>
              )}
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Edit Todo
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className=" p-4">
                  <form>
                    <div className="mb-3">
                      <label for="todoTitle" className="form-label">
                        Todo Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="todoTitle"
                        name="todoTitle"
                        onChange={(e) => handleChange(e)}
                        defaultValue={data?.todoTitle}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">With Description</span>
                      <textarea
                        className="form-control"
                        aria-label="With textarea"
                        defaultValue={data.description}
                        onChange={handleChange}
                        name="description"
                        id="description"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Edit
                    </button>
                  </form>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;
