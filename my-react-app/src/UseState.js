import {useState} from "react";

const prices = [100, 200, 300];

function UseState() {
  /* không nên dùng cách này vì khi setState sẽ khiến App re-render và sẽ tnh toán lại 'initCount'
   const initCount = prices.reduce((acc, cur) => acc + cur);
   const [count, setCount] = useState(initCount);
  */

  // nên dùng
  const [count, setCount] = useState(() => {
    const initCount = prices.reduce((acc, cur) => acc + cur);
    return initCount;
  });

  const handleIncrease = () => {
    /* nếu muốn count+3 thì không dùng cách này vì count ở đây đang tham chiếu 1 giá trị
       cho nên cả 3 count ở đây đều cùng 1 giá trị
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    */

    // nên dùng
    setCount(prevState => prevState + 1);
    /*
    setCount(prevState => prevState + 1);
    setCount(prevState => prevState + 1);
    setCount(prevState =>{
       //logic
      return prevState + 1
    } );
     */
  }

  const handleDecrease = () => {
    setCount(count - 1);
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleDecrease}>-</button>
      <button onClick={handleIncrease}>+</button>
    </div>

  )
}

export default UseState;