import { useReducer } from "react";

function Testing() {

  const initialState = {
    appleCount: 1,
    bananaCount: 10,
    message: "Hello, World!",
    happy: false,
  };

  function ReducerFunction(state, action) {
    switch (action.type) {
      case "ADD_APPLE":
        return { ...state, appleCount: state.appleCount + 1 };
      case "ADD_BANANA":
        return { ...state, bananaCount: state.bananaCount + 1 };
      case "SET_MESSAGE":
        return { ...state, message: action.payload };
      case "TOGGLE_HAPPY":
        return { ...state, happy: !state.happy };
      case "CHANGE_EVERYTHING":
        return {
          appleCount: 0,
          bananaCount: 0,
          message: action.customMessage,
          happy: true,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(ReducerFunction, initialState);

  return (
    <>
      <div>
        <h1>Apple Count: {state.appleCount}</h1>
        <h1>Banana Count: {state.bananaCount}</h1>
        <h1>Message: {state.message}</h1>
        <h1>Happy: {state.happy ? "Yes" : "No"}</h1>
        <button onClick={() => dispatch({ type: "ADD_APPLE" })}>
          Add Apple
        </button>
        <button onClick={() => dispatch({ type: "CHANGE_EVERYTHING", customMessage: "The message is now coming from the dispatch!" })}>
          Change Everything
        </button>
      </div>
    </>
  )
}

export default Testing
