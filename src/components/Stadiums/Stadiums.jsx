import "../../scss/Stadiums.scss";
import stadiums from "../../assets/json/Stadiums.json";

const Stadiums = () => {
    document.title = "Sedes | Qatar 2022";

    const loadImage = (imageName) => require(`../../assets/img/${imageName}`);
    return (
        <div className="stadiums-container">
            <h1>Sedes</h1>
            <div className="stadiums">
                {stadiums.response.map((stadium, key) => {
                    return (
                        <div key={key}>
                            <h2>{stadium.name}</h2>
                            <img className="stadium-img" src={loadImage(stadium.image)} alt="stadium-img" />
                            <div className="stadium-info">
                                <h3>Ciudad: {stadium.city}</h3>
                                <h3>Capacidad: {stadium.capacity}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Stadiums;
