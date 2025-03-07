import React, { useState, useEffect, useContext, useReducer, useRef, createContext } from "react";

// Define a context
const MyContext = createContext<string | null>(null);

// Reducer function for useReducer
const reducer = (state: number, action: { type: "increment" | "decrement" }) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
};

// Props Interface
interface Props {
  title: string;
}

const MyComponent: React.FC<Props> = ({ title }) => {
  // useState example
  const [count, setCount] = useState<number>(0);

  // useEffect example
  useEffect(() => {
    console.log("Component mounted or count changed", count);
  }, [count]);

  // useContext example
  const contextValue = useContext(MyContext);

  // useReducer example
  const [state, dispatch] = useReducer(reducer, 0);

  // useRef example
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>

      <p>Reducer State: {state}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>

      <p>Context Value: {contextValue}</p>

      <input ref={inputRef} type="text" placeholder="Type something" />
      <button onClick={() => inputRef.current?.focus()}>Focus Input</button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <MyContext.Provider value="Hello from Context!">
      <MyComponent title="React Hooks with TypeScript" />
    </MyContext.Provider>
  );
};

export default App;
