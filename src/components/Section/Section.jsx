import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import "./section.css";

function Result({ speed }) {
  const renderResult = useMemo(() => {
    return (
      <>
        <div className="result">
          <div>Speed is {speed}wpm</div>
          <button
            style={{ padding: "5px 10px", marginTop: 10, cursor: "pointer" }}
            onClick={() => {
              window.location.reload();
            }}
          >
            Reload
          </button>
        </div>
      </>
    );
  }, []);

  return <>{renderResult}</>;
}

function Timer({ state, timerComplete }) {
  const [counter, setCounter] = useState(60);
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

function Section() {
  const [timerState, setTimerState] = useState(false);
  const [speed, setSpeed] = useState();
  let currentIndex = 0;

  let paragraphTable = [
    `The bikers rode down the long and narrow path to reach the city park. When they reached a good spot to rest, they began to look for signs of spring. The sun was bright, and a lot of bright red and blue blooms proved to all that warm spring days were the very best. Spring rides were planned. They had a burger at the lake and then rode farther up the mountain. As one rider started to get off his bike, he slipped and fell. One of the other bikers saw him fall but could do nothing to help him. Neither the boy nor the bike got hurt. After a brief stop, everyone was ready to go on. All the bikers enjoyed the nice view when they came to the top. All the roads far below them looked like ribbons. A dozen or so boats could be seen on the lake. It was very quiet and peaceful and no one wished to leave. As they set out on their return, they all enjoyed the ease of pedaling. The bikers came upon a new bike trail. This route led to scenery far grander than that seen from the normal path. The end of the day brought laughs and cheers from everyone. The fact that each person was very, very tired did not keep anyone from eagerly planning for the exciting ride to come. A freelancer or freelance worker, is a term commonly used for a person who is self-employed and is not necessarily committed to a particular employer long-term. Freelance workers are sometimes represented by a company or a temporary agency that resells freelance labor to clients; others work independently or use professional associations or websites to get work. While the term 'independent contractor' would be used in a higher register of English to designate the tax and employment classes of this type of worker, the term freelancing is most common in culture and creative industries and this term specifically motions to participation therein. Fields, professions, and industries where freelancing is predominant include: music, writing, acting, computer programming, web design, graphic design, translating and illustrating, film and video production and other forms of piece work which some cultural theorists consider as central to the cognitive-cultural economy. Two members of the 1984 class of Jefferson High School are chairing a group of 18 to look for a resort for the 20-year class reunion. A lovely place 78 miles from the city turns out to be the best. It has 254 rooms and a banquet hall to seat 378. It has been open 365 days per year since opening on May 30, 1926. They will need 450 to reserve the resort. Debbie Holmes was put in charge of buying 2,847 office machines for the entire firm. Debbie visited more than 109 companies in 35 states in 6 months. She will report to the board today in Room 2784 at 5 p.m. The board will consider her report about those 109 firms and recommend the top 2 or 3 brands to purchase. Debbie must decide before August 16. Lynn Greene said work started on the project March 27, 2003. The 246 blueprints were mailed to the office 18 days ago. The prints had to be 100 percent accurate before they were acceptable. The project should be finished by May 31, 2025. At that time there will be 47 new condominiums, each having at least 16 rooms. The building will be 25 stories.`,
  ];

  let para = paragraphTable[0];

  function handleBackPress(e) {
    if (currentIndex == 0) return;
    document.getElementById(currentIndex - 1).classList.remove("done-letter");
    document.getElementById(currentIndex - 1).classList.remove("wrong-letter");
    document.getElementById(currentIndex - 1).classList.add("current-letter");
    document.getElementById(currentIndex).classList.remove("current-letter");

    currentIndex--;
  }
  let scrollPos = 1;

  const keyPress = useCallback(function handleKeyPress(e) {
    if (
      document.getElementById(currentIndex + 1).offsetTop !=
      document.getElementById(currentIndex).offsetTop
    ) {
      console.log("SCROLL");
      document.getElementById("text-container").style.transform = `translateY(${
        scrollPos++ * -54.8
      }px)`;
    }
    if (timerState == "Over") return;
    if (timerState == false) {
      setTimerState(true);
    }
    if (e.key == "Shift") return;
    if (e.key == " ") e.preventDefault();
    if (e.key == "Backspace") {
      e.preventDefault();
      handleBackPress(e);
      return;
    }
    document.getElementById(currentIndex).classList.remove("current-letter");
    document.getElementById(currentIndex + 1).classList.add("current-letter");
    if (para.split("")[currentIndex] == e.key) {
      e.preventDefault();
      document.getElementById(currentIndex).classList.add("done-letter");
    } else {
      document.getElementById(currentIndex).classList.add("wrong-letter");
    }

    currentIndex++;
  }, []);
  useEffect(() => {
    if (timerState == "Over") {
      window.removeEventListener("keydown", keyPress);
    } else {
      window.addEventListener("keydown", keyPress);
    }

    return () => window.removeEventListener("keydown", keyPress);
  }, []);
  let key = 0;

  function calculateResult() {
    document.getElementById("text-container").style.transform =
      "translateY(0px)";
    document.getElementById("text-container").style.zIndex = 1000;

    let correctLetter = document.querySelectorAll(".done-letter").length;
    let wrongLetter = document.querySelectorAll(".wrong-letter").length;
    let totalLetter = correctLetter + wrongLetter;

    let wpm = Math.round((totalLetter / 5 / 60) * 60);
    setSpeed(wpm);
    setTimerState("Over");
  }
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
        style={{ margin: 0, width: "100%", zIndex: -1 }}
      >
        {timerState == "Over" ? (
          <Result speed={speed} />
        ) : (
          para.split(" ").map((word, i) => {
            return (
              <div key={i} className="word">
                {word.split("").map((letter, index) => {
                  return (
                    <div
                      id={key++}
                      key={key}
                      className={key == 1 ? "letter current-letter" : "letter"}
                    >
                      {letter}
                    </div>
                  );
                })}
                <div id={key++} className="letter">
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
