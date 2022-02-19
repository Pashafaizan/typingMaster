import { useMemo } from "react";

function Result({ result }) {
    const renderResult = useMemo(() => {
      return (
        <>
          <div className="result">
            <div>Speed is {result.speed} wpm</div>
            <div>Accuracy is {result.accuracy} %</div>
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

export default Result;