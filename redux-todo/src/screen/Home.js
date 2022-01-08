import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import TodoInput from "../components/TodoInputs/TodoInput";
import TodoList from "../components/TodoList/TodoList";

function Home(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <div className="container">
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default Home;
