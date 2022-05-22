import "../../scss/Team.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCoach, getTeam } from "../../redux/actions";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import teamNames from "../../assets/json/TeamNames.json";
import playerPosition from "../../assets/json/PlayerPosition.json";

const Team = () => {
    const { teamId } = useParams();
    const dispatch = useDispatch();
    const team = useSelector((state) => state.teams[teamId]);
    const coach = useSelector((state) => state.coachs[teamId]);
    const error = useSelector((state) => state.error);

    useEffect(() => {
        if (!team) {
            dispatch(getTeam(teamId));
            dispatch(getCoach(teamId));
        }
        team &&
            (document.title = teamNames.hasOwnProperty(team.team.name)
                ? teamNames[team.team.name] + " | Qatar 2022"
                : team.team.name + " | Qatar 2022");
    }, [dispatch, teamId, team]);

    return (
        <div>
            {error.request ? (
                <h2 className="team-container">{error.request}</h2>
            ) : error.rateLimit ? (
                <h2 className="team-container">{error.rateLimit}</h2>
            ) : error.error ? (
                <h2 className="team-container">{error.error}</h2>
            ) : team?.team ? (
                <div className="team-container">
                    <div className="team-logo-container">
                        <h1 className="fw-bold">
                            {teamNames.hasOwnProperty(team.team.name) ? teamNames[team.team.name] : team.team.name}
                        </h1>
                        <img className="team-logo" src={team.team.logo} alt="team-logo" />
                    </div>
                    <hr />

                    <div className="squad">
                        {coach && (
                            <div className="player">
                                <h3 className="text-center fw-bold">{coach.name}</h3>
                                <img className="player-photo" src={coach.photo} alt="coach-img" />
                                <h4 className="text-center">{coach.age ? `${coach.age} años - DT` : "DT"}</h4>
                            </div>
                        )}
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
            ) : (
                <h1 className="team-container">Cargando...</h1>
            )}
        </div>
    );
};

export default Team;
