import { useEffect, useState } from "react";

function Testing() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    console.log("Testing component mounted");
  }, []);

  useEffect(() => {
    console.log("Count has changed:", count);
  }, [count]);

  const IncreaseCount = () => {
    setCount(current => current + 1);
  };

  const DecreaseCount = () => {
    setCount(current => current - 1);
  };

  return (
    <>
      <h1>The current count is : {count}</h1>
      <br/>
      <button onClick={IncreaseCount}>Increase</button>
      <br/>
      <button onClick={DecreaseCount}>Decrease</button>
    </>
  )
}

export default Testing
