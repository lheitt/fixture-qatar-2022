import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
    useEffect(() => {
        getStandings();
    }, []);

    const [standing, setStanding] = useState(undefined);

    const getStandings = async () => {
        const res = await axios.get("https://v3.football.api-sports.io/standings?league=1&season=2022", {
            headers: {
                "x-apisports-key": "ef224bf18c58c8b7e6a56c241b88742e",
            },
        });

        setStanding(res.data.response[0]);
    };

    return (
        <div className="App">
            {standing ? (
                <>
                    <div>
                        <h1>{standing.league.name}</h1>
                        <img src={standing.league.logo} alt="world-cup-logo" />
                    </div>
                    <hr />
                    <div className="groups">
                        {standing.league.standings.map((group) => {
                            return (
                                <div className="group">
                                    <h2>{group[0].group}</h2>
                                    <table>
                                        <tr>
                                            <th>Equipo</th>
                                            <th>PTS</th>
                                            <th>PJ</th>
                                            <th>PG</th>
                                            <th>PE</th>
                                            <th>PP</th>
                                            <th>GF</th>
                                            <th>GC</th>
                                            <th>DIF</th>
                                        </tr>

                                        {group.map((team) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <img
                                                            className="teams-logos"
                                                            src={team.team.logo}
                                                            alt={team.team.name + "-logo"}
                                                        />{" "}
                                                        {team.team.name}
                                                    </td>
                                                    <td>{team.points}</td>
                                                    <td>{team.all.played}</td>
                                                    <td>{team.all.win}</td>
                                                    <td>{team.all.draw}</td>
                                                    <td>{team.all.lose}</td>
                                                    <td>{team.all.goals.for}</td>
                                                    <td>{team.all.goals.against}</td>
                                                    <td>{team.goalsDiff}</td>
                                                </tr>
                                            );
                                        })}
                                    </table>
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : (
                <h1>Cargando...</h1>
            )}
        </div>
    );
}

export default App;
