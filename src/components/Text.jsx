import ButtonControl from "./ButtonControl";
import { ContextData } from "./Context";
import { useContext } from "react";

function Text() {
  const contextValues = useContext(ContextData);

  const {
    songs,
    isPlaying,
    setIsPlaying,
    index,
    setIndex,
    progressRef,
    remainingTimeRef,
    progressContainerRef,
  } = contextValues;

  return (
    <div className="container">
      <div className="header">PLAYING NOW</div>

      <div className="img">
        <img src={songs[index].img_src} alt="" />
      </div>

      <div className="details-song">
        <h3>{songs[index].title}</h3>
        {/* <h4>{songs[index].artist}</h4> */}
        <div className="progress-bar" ref={progressContainerRef}>
          <sup className="remaining-time" ref={remainingTimeRef}></sup>
          <div className="progress" ref={progressRef}></div>
          <sup className="remaining-time2"></sup>
        </div>
      </div>

      <ButtonControl
        songs={songs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setIndex={setIndex}
      />
    </div>
  );
}

export default Text;
