import { useState, useEffect, useRef } from "react";
import { createContext } from "react";

//
export const ContextData = createContext();

//
function Context(props) {
  //
  // to control the audio and some element
  const audioEL = useRef();
  const progressRef = useRef();
  const remainingTimeRef = useRef();
  const progressContainerRef = useRef();
  const btnPuse = useRef();

  //
  const [isPlaying, setIsPlaying] = useState(false);

  const [index, setIndex] = useState(0);

  // data of mp3
  const [songs, setSongs] = useState([
    {
      title: "الفاتحة",
      img_src:
        "https://4.bp.blogspot.com/-iZmM_nzEahk/WuNIDGa6dmI/AAAAAAAADTI/FLjtzBPbXL8lWaV1x0OtzxPuIQod3uNJwCK4BGAYYCw/s1600/images%2B%25281%2529.jpg",
      src: "https://server12.mp3quran.net/maher/Almusshaf-Al-Mojawwad/001.mp3",
    },
    {
      title: "الكوثر",
      img_src: "https://upload.wikimedia.org/wikipedia/commons/6/66/Surah_Al-Kawthar.png",
      src: "https://server12.mp3quran.net/maher/Almusshaf-Al-Mojawwad/108.mp3",
    },
    {
      title: "العلق",
      img_src: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Surah_Al-Alaq.png",
      src: "https://server8.mp3quran.net/frs_a/096.mp3",
    },
  ]);

  // start function section

  const timeUpDateFunc = () => {
    const currentTime = audioEL.current.currentTime;
    const duration = audioEL.current.duration;

    //
    const remainingTime = duration - currentTime;
    const minutes = Math.floor(remainingTime / 60);
    const seconds = Math.floor(remainingTime % 60);

    //
    const percent = (currentTime / duration) * 100;
    progressRef.current.style.width = `${percent}%`;

    //

    if (percent) {
      remainingTimeRef.current.textContent = `${minutes.toString().padStart(2, 0)}:${seconds
        .toString()
        .padStart(2, 0)}`;
    } else {
      remainingTimeRef.current.textContent = `00:00`;
    }
  };
  //

  //

  const endedFunc = (e) => {
    setIndex(() => {
      if (index >= songs.length - 1) {
        return 0;
      } else {
        return index + 1;
      }
    });

    audioEL.current.src = `${songs[index].src}`;
    audioEL.current.addEventListener("loadedmetadata", () => {
      // setIsPlaying(true);
      audioEL.current.play();
    });
  };

  //
  const progressContainerRefFunc = (e) => {
    const width = progressContainerRef.current.clientWidth;
    const clickX = e.offsetX;
    const clickPercent = clickX / width;
    audioEL.current.currentTime = clickPercent * audioEL.current.duration;
  };

  // end function section

  //
  useEffect(() => {
    // condition to check true or false
    if (remainingTimeRef.current.textContent === "") {
      remainingTimeRef.current.textContent = `00:00`;
    }

    progressContainerRef.current.addEventListener("click", progressContainerRefFunc);

    //
    audioEL.current.addEventListener("timeupdate", timeUpDateFunc);

    audioEL.current.addEventListener("ended", endedFunc);

    if (isPlaying) {
      audioEL.current.play();
    } else {
      audioEL.current.pause();
    }
  });

  //

  return (
    <ContextData.Provider
      value={{
        progressContainerRef,
        songs,
        index,
        setIndex,
        isPlaying,
        setIsPlaying,
        progressRef,
        remainingTimeRef,
        btnPuse,
      }}
    >
      {props.children}
      <audio ref={audioEL} src={songs[index].src}></audio>
    </ContextData.Provider>
  );
}

export default Context;
