import "../../scss/Team.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiKey from "../../utils/apiKey";
import json from "../../json/Squads.json";
import teamNames from "../../json/TeamNames.json";
import playerPosition from "../../json/PlayerPosition.json";

const Team = () => {
    useEffect(() => {
        getTeam();

        // eslint-disable-next-line
    }, []);

    const { teamId } = useParams();
    const [error, setError] = useState("");
    const [team, setTeam] = useState(undefined);

    const getTeam = async () => {
        if (teamId !== "26") {
            const res = await axios.get(`https://v3.football.api-sports.io/players/squads?team=${teamId}`, {
                headers: {
                    "x-apisports-key": apiKey,
                },
            });

            Array.isArray(res.data.errors) === true
                ? setTeam(res.data.response[0])
                : setError(res.data.errors.requests);
        } else {
            setTeam(json.response[0]);
        }
    };

    return (
        <div>
            {team ? (
                <div className="team-container">
                    <div className="team-logo-container">
                        <h1 className="fw-bold">{teamNames.hasOwnProperty(team.team.name) ? teamNames[team.team.name] : team.team.name}</h1>
                        <img className="team-logo" src={team.team.logo} alt="team-logo" />
                    </div>
                    <hr />

                    <div className="squad">
                        {team.players.map((player, key) => {
                            return (
                                <div
                                    className={`player ${
                                        player.position === "Goalkeeper"
                                            ? "border-danger"
                                            : player.position === "Defender"
                                            ? "border-warning"
                                            : player.position === "Midfielder"
                                            ? "border-success"
                                            : player.position === "Attacker"
                                            ? "border-primary"
                                            : ""
                                    }`}
                                    key={key}
                                >
                                    <Link to={`/player/${player.id}`}>
                                        <h3 className="text-center fw-bold">
                                            {player.number ? `${player.number} ${player.name}` : player.name}
                                        </h3>
                                    </Link>
                                    <img className="player-photo" src={player.photo} alt="player-img" />
                                    {player.age ? (
                                        <h4 className="text-center">{`${player.age} años - ${
                                            playerPosition[player.position]
                                        }`}</h4>
                                    ) : (
                                        <h4 className="text-center">{`${playerPosition[player.position]}`}</h4>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : error ? (
                <h2 className="team-container">{error}</h2>
            ) : (
                <h1 className="team-container">Cargando...</h1>
            )}
        </div>
    );
};

export default Team;
