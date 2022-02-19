import React, {useEffect,useRef,} from "react";
import Timer from "../Timer/Timer";
import Result from "../Result/Result";
import "./section.css";
import useTypeMaster from "./useTypeMaster";

function Section({ para }) {
  const charRef = useRef([...new Array(para.length)].map(() => React.createRef()));
  const textContainer = useRef(null)
  const { keyPress, timerState, result, calculateResult } = useTypeMaster(charRef,textContainer,para);

  let key = 0;

  useEffect(() => {
    if (timerState == "Over") {
      window.removeEventListener("keydown", keyPress);
    } else {
      window.addEventListener("keydown", keyPress);
    }
    return () => window.removeEventListener("keydown", keyPress);
  }, []);

  return (
    <div className="section_body" style={{ overflow: "hidden" }}>
      <Timer
        state={timerState}
        timerComplete={() => {
          window.removeEventListener("keydown", keyPress);
          calculateResult();
        }}
        key={key}
      />

      <div
        tabIndex={0}
        className="section_body"
        id="text-container"
        ref={textContainer}
        style={{ margin: 0, width: "100%", zIndex: -1 }}
      >
        {timerState == "Over" ? (
          <Result result={result} />
        ) : (
          para.split(" ").map((word, i) => {
            return (
              <div key={i} className="word">
                {word.split("").map((letter, j) => {
                  return (
                    <div key={key} ref={charRef.current[key++]} className={key == 1 ? "letter current-letter" : "letter"} >
                      {letter}
                    </div>
                  );
                })}
                <div ref={charRef.current[key++]} className="letter">
                  &nbsp;
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Section;
