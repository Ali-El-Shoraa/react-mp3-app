import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
// import { useRef } from "react";

function ButtonControl(props) {
  // const btnPuse = useRef();

  return (
    <div className="btns">
      {/* btn to last mp3 */}
      <button
        className="skip-btn"
        onClick={() => {
          props.setIndex((p) => {
            if (p <= 0) {
              props.setIsPlaying(true);
              return props.songs.length - 1;
            } else {
              props.setIsPlaying(true);
              return p - 1;
            }
          });
        }}
      >
        <FontAwesomeIcon icon={faBackward} />
      </button>

      {/* btn to start mp3 */}
      <button
        className="play-btn"
        onClick={() => {
          props.setIsPlaying((p) => !p);
        }}
      >
        <FontAwesomeIcon ref={props.btnPuse} icon={props.isPlaying ? faPause : faPlay} />
      </button>

      {/* btn to to next mp3 */}
      <button
        className="skip-btn"
        onClick={() => {
          props.setIndex((p) => {
            if (p >= props.songs.length - 1) {
              props.setIsPlaying(true);
              return 0;
            } else {
              props.setIsPlaying(true);
              return p + 1;
            }
          });
        }}
      >
        <FontAwesomeIcon icon={faForward} />
      </button>
    </div>
  );
}

export default ButtonControl;
