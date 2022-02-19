import { useState } from "react";

export default function useTypeMaster(charRef,textContainer,para) {
    const [timerState, setTimerState] = useState(false);
    const [result, setResult] = useState();
    let currentIndex = 0, scrollPos=1;

    const keyPress = (e) => {
        if (timerState == "Over" || !charRef.current[currentIndex+1].current) return;
        if (
            charRef.current[currentIndex + 1].current.offsetTop !=
            charRef.current[currentIndex].current.offsetTop
          ) {
            textContainer.current.style.transform = `translateY(${
              scrollPos++ * -54.8
            }px)`;
          }
          if (timerState == false) {
            setTimerState(true);
          }
          if (["Shift","Alt","Control","AltGraph","Capslock","Tab"].includes(e.key)) return;
          if (e.key == " ") e.preventDefault();
          if (e.key == "Backspace") {
            e.preventDefault();
            handleBackPress(e);
            return;
          }
          charRef.current[currentIndex].current.classList.remove("current-letter");
          charRef.current[currentIndex + 1].current.classList.add("current-letter");
          if (para.split("")[currentIndex] == e.key) {
            e.preventDefault();
            charRef.current[currentIndex].current.classList.add("done-letter");
          } else {
            charRef.current[currentIndex].current.classList.add("wrong-letter");
          }
          currentIndex++;
    }

    const handleBackPress = (e) => {
        if (currentIndex == 0) return;
        charRef.current[currentIndex - 1].current.classList.remove("done-letter");
        charRef.current[currentIndex - 1].current.classList.remove("wrong-letter");
        charRef.current[currentIndex - 1].current.classList.add("current-letter");
        charRef.current[currentIndex].current.classList.remove("current-letter");
    
        currentIndex--;
    }

    const calculateResult = () => {
        textContainer.current.style.transform =
        "translateY(0px)";
        textContainer.current.style.zIndex = 1000;

        let correctLetter = document.querySelectorAll(".done-letter").length;
        let wrongLetter = document.querySelectorAll(".wrong-letter").length;
        let totalLetter = correctLetter + wrongLetter;

        let wpm = Math.round((totalLetter / 5 / 60) * 60);
        let accuracy = Math.round(correctLetter/totalLetter*100);
        setResult({speed: wpm,accuracy });
        setTimerState("Over");
    }

    return {keyPress,timerState,result,calculateResult}
}