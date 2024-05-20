import { useRef, useState } from "react";
function App() {
  const [time, setTime] = useState(25 * 60);
  const [isRun, setIsRun] = useState(false);

  const interval = useRef(null);

  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time - minutes * 60).toString().padStart(2, "0");

  function startTimer() {
    if (interval.current !== null) return;

    setIsRun(true);
    interval.current = setInterval(() => {
      setTime((time) => {
        if (time >= 1) return time - 1;

        resetTimer();
        return 0;
      });
    }, 1000);
  }

  function stopTimer() {
    if (interval.current === null) return;
    clearInterval(interval.current);
    interval.current = null;
    setIsRun(false);
  }

  function resetTimer() {
    clearInterval(interval.current);
    interval.current = null;
    setTime(25 * 60);
    setIsRun(false);
  }

  return (
    <div className="flex items-center justify-center w-full min-h-screen overflow-hidden font-sans bg-white">
      <div className="space-y-6 text-center flex flex-col items-center gap-1">
        <h1 className="font-bold text-black cursor-pointer transition-all hover:opacity-70 text-3xl mb-18">
          Why don't you take a challenge😏
        </h1>
        <div className="gap-14 flex items-center text-center">
          <button className="text-blue-600 font-bold transition-all hover:bg-red-50 p-2 rounded-lg">
            Pomodoro <span className="font-extrabold text-blue-600">0</span>
          </button>
          <button className="text-green-700 font-bold transition-all hover:bg-green-50 p-2 rounded-lg">
            Rest <span className="font-extrabold text-green-700">0</span>
          </button>
          <button className="text-red-600 transition-all font-bold hover:bg-red-50 p-2 rounded-lg">
            Long Rest <span className="font-extrabold text-red-700">0</span>
          </button>
        </div>
        <div className="mt-20">
          <div className="m-3 flex h-72 w-72 items-center text-blue-500 text-7xl justify-center rounded-full bg-blue-50 border-4 border-blue-200 hover:bg-blue-100">
            <span>{minutes}</span>
            <span>:</span>
            <span>{seconds}</span>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-6">
          {!isRun && (
            <button
              onClick={startTimer}
              className="inline-block px-8 py-2 text-lg font-medium text-white bg-blue-600 rounded-lg transition-all hover:bg-blue-700"
            >
              START
            </button>
          )}
          {isRun && (
            <button
              onClick={stopTimer}
              className="inline-block px-8 py-2 text-lg font-medium text-white bg-blue-600 rounded-lg transition-all hover:bg-blue-700"
            >
              STOP
            </button>
          )}

          <button
            onClick={resetTimer}
            className="inline-block px-8 py-2 text-lg font-medium text-white bg-blue-600 rounded-lg transition-all hover:bg-blue-700"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
