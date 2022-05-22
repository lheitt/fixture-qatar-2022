import "../../scss/Symbols.scss";
import petImage from "../../assets/img/La'eeb.jpg";
import ballImage from "../../assets/img/Al Rihla.jpg";
import songCover from "../../assets/img/Hayya Hayya Cover.jpg";
import song from "../../assets/music/Hayya Hayya.mp3";
import ReactAudioPlayer from "react-audio-player";

const Symbols = () => {
    document.title = "Símbolos | Qatar 2022";
    return (
        <div className="symbols-container">
            <h1>Símbolos</h1>
            <div className="symbols">
                <div className="pet-ball">
                    <div>
                        <h2>Mascota</h2>
                        <img className="symbol-img" src={petImage} alt="pet-img" />
                        <h3>La'eeb</h3>
                    </div>
                    <div>
                        <h2>Balón</h2>
                        <img className="symbol-img" src={ballImage} alt="ball-img" />
                        <h3>Al Rihla</h3>
                    </div>
                </div>
                <div className="song">
                    <h2>Canción Oficial</h2>
                    <img className="song-cover" src={songCover} alt="song-cover" />
                    <h5>Hayya Hayya (Better Together)</h5>
                    <h6>Trinidad Cardona, DaVido y Aisha</h6>
                    <div className="audio-player">
                        <ReactAudioPlayer src={song} controls volume={0.5} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Symbols;
