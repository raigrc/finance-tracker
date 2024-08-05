import React, { useEffect, useState } from "react";

const CurrentDateTime = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const updateTime = () => {
    setCurrentTime(new Date());
  };

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [currentTime]);
  return (
    <div className="space-x-2">
      <span>{currentTime.toDateString()}</span>
      <span>{currentTime.toLocaleTimeString()}</span>
    </div>
  );
};

export default CurrentDateTime;
