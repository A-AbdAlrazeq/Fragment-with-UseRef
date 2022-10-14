import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";
import Wrapper from "../Helper/Wrapper";

const AddUser = (props) => {
  const nameInput = useRef();
  /* always it's object & always have current hold the actual value that ref connected with
  we can access he value of element nameInput.current.value,no need for state we can read the value when
  the submit button is pressed.
  we not manipulate the dom just change what user enter
  if you want just read a value you can use ref
  if we access value with ref is uncontrolled component because is internal state the value not control
  by react
  when we manage our state and update that state on every keystroke and the state back to input with the value prop that's called controlled component
  internal state control by react */
  const ageInput = useRef();
  /*  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState(""); */
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enterName = nameInput.current.value;
    const enterAge = ageInput.current.value;
    if (enterName.trim().length === 0 || enterAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+enterAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(enterName, enterAge);
    /* rarely use ref to manipulate the dom */
    nameInput.current.value = "";
    ageInput.current.value = "";
    /* we use ref and access the native dom element with variable.current and this use regular dom api (.value)
    for setting a value of dom node of a input dom node */
    /*  setEnteredUsername("");
    setEnteredAge(""); */
  };

  /* const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  }; */

  const errorHandler = () => {
    setError(null);
  };
  /*in react you cant return more than one root jsx element&
  can't store more than one root jsx element in variable
  we can fix it with wrapping it with div or we can use array [] but must put key to every element
    */
  /* to avoid div soup we use fragment>it's a empty wrapper component,it's doesn't render any html
  element to the dom,but if full fills react jsx requirement
  React Fragments allow you to wrap or group multiple elements without adding an extra node to the DOM.
 This can be useful when rendering multiple child elements/components in a single parent component  */

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            /*  value={enteredUsername}
            onChange={usernameChangeHandler} */
            ref={nameInput}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            /*  value={enteredAge}
            onChange={ageChangeHandler} */
            ref={ageInput}
            /* this is built in props can add to any html element */
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
