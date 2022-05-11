import "./Team.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiKey from "../../utils/apiKey";

function Team() {
    useEffect(() => {
        getTeam();

        // eslint-disable-next-line
    }, []);

    const { teamId } = useParams();
    const [error, setError] = useState("");
    const [team, setTeam] = useState(undefined);

    const getTeam = async () => {
        const res = await axios.get(`https://v3.football.api-sports.io/players/squads?team=${teamId}`, {
            headers: {
                "x-apisports-key": apiKey,
            },
        });

        Array.isArray(res.data.errors) === true ? setTeam(res.data.response[0]) : setError(res.data.errors.requests);
    };

    return (
        <div>
            {team ? (
                <div>
                    <h1>{team.team.name}</h1>
                    <img src={team.team.logo} alt="team-logo" />

                    <ul>
                        {team.players.map((player, key) => {
                            return (
                                <li key={key}>
                                    <Link to={`/player/${player.id}`}>
                                        <h3>{`${player.number} ${player.name}`}</h3>
                                    </Link>
                                    <img className="player-photo" src={player.photo} alt="player-img" />
                                    <h4>{`${player.age} años - ${player.position}`}</h4>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : error ? (
                <h2>{error}</h2>
            ) : (
                <h1>Cargando...</h1>
            )}
        </div>
    );
}

export default Team;
