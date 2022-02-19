import { useEffect, useState } from "react";


function Timer({ state, timerComplete }) {
    const [counter, setCounter] = useState(5);
    function trigerTimer() {
      setTimeout(() => {
        if (counter == 0) {
          timerComplete();
          return;
        }
        setCounter(counter - 1);
      }, 1000);
    }
    useEffect(() => {
      if (state) trigerTimer();
    }, [state, counter]);
    return <div className="timer">{"00:" + counter}</div>;
}

export default Timer;