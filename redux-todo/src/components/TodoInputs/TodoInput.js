import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAction } from "../../actions/todoActions";

function TodoInput() {
  const dispatch = useDispatch();
  const addTodo = useSelector((state) => state.addTodo);
  const { error } = addTodo;
  const [data, setData] = useState({
    todoTitle: "",
    description: "",
    complete: false,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { todoTitle, description } = data;
    if (!!todoTitle && !!description) {
      dispatch(addTodoAction(todoTitle, description));
    }
    setData((prev) => ({
      ...prev,
      todoTitle: "",
      description: "",
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="card p-4 mt-5">
      {error && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label for="todoTitle" className="form-label">
            Todo Title
          </label>
          <input
            type="text"
            className="form-control"
            id="todoTitle"
            name="todoTitle"
            onChange={handleChange}
            value={data?.todoTitle.length ? data?.todoTitle : null}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">With Description</span>
          <textarea
            className="form-control"
            aria-label="With textarea"
            value={data.description.length ? data.description : null}
            onChange={handleChange}
            name="description"
            id="description"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default TodoInput;
