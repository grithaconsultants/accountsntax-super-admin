import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const renderTime = ({ remainingTime }: any) => {
  if (remainingTime === 0) {
    return <div className="timer">Too lale...</div>;
  }

  return (
    <div className="timer">
      <div className="value">{remainingTime}</div>
    </div>
  );
};

function Countdown(props: any) {

  const { onCompleteEvent } = props;

  return (
    <div className="timer-wrapper ms-1">
      <CountdownCircleTimer
        isPlaying
        duration={25}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        onComplete={onCompleteEvent}
        size={30}
        strokeWidth={3}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
}

export default Countdown;