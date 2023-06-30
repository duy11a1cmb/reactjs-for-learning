// side effect

/*
* Event: add/remove event listener
* Observer pattern: subscribe/unsubscribe
* Closure:
* Timer: setInterval,setTimeout,...
* useState:
* Mounted/Unmounted:
* */

import {useEffect, useState} from "react";


/* cac truong hop khi dung useEffect
* useEffect(callback)  --> callback moi khi component re-render,callback sau khi element them vao trong dom
* useEffect(callback,[]) --> callback 1 lan sau khi component mounted
* useEffect(callback,[deps])
*
* ---> callback trong useEffect luon duoc goi sau khi component mounted
* ---> cleanuo func luon goi truoc component unmounted
* */

const prices = [100, 200, 300];

function UseEffect() {
  const [count, setCount] = useState(() => {
    const initCount = prices.reduce((acc, cur) => acc + cur);
    return initCount;
  });

  const [data, setData] = useState([]);
  const [isShowBtnToTop, setIsShowBtnToTop] = useState(false);

  const handleIncrease = () => {
    setCount(prevState => prevState + 1);
  }

  const handleDecrease = () => {
    setCount(count - 1);
  }


  // useEffect(callback) only use callback
  // update dom
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(root => root.json())
      .then(res => setData(res))
  }, [])


  useEffect(() => {
    const handleScroll = () => {
      setIsShowBtnToTop(window.scrollY >= 200);
    }
    window.addEventListener('scroll', handleScroll);

    // cleanup -> chay truoc khi component unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleDecrease}>-</button>
      <button onClick={handleIncrease}>+</button>
      <ul>
        {data?.map((res, index) => {
          return (
            <li key={index}>{res.title}</li>
          )
        })}
      </ul>
      {isShowBtnToTop && <button style={{position: "fixed", bottom: 20, right: 20}}>Back To Top</button>}
    </div>
  )
}


export default UseEffect;