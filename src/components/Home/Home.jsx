import "../../scss/Home.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiKey from "../../utils/apiKey";
import json from '../../json/Standings.json';


function Home() {
    useEffect(() => {
        getStandings();
    }, []);

    const [error, setError] = useState("");
    const [standing, setStanding] = useState(undefined);

    const getStandings = async () => {
        // const res = await axios.get("https://v3.football.api-sports.io/standings?league=1&season=2022", {
        //     headers: {
        //         "x-apisports-key": apiKey,
        //     },
        // });

        // Array.isArray(res.data.errors) === true
        //     ? setStanding(res.data.response[0])
        //     : setError(res.data.errors.requests);
        
        setStanding(json.response[0])
    };

    return (
        <div>
            {standing ? (
                <>
                    <div className="world-cup-container">
                        <h1>{standing.league.name}</h1>
                        <img src={standing.league.logo} alt="world-cup-logo" />
                    </div>
                    <hr />
                    <div className="groups">
                        {standing.league.standings.map((group, gkey) => {
                            return (
                                <div className="group" key={gkey}>
                                    <h2>{group[0].group}</h2>
                                    <table>
                                        <thead>
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
                                        </thead>

                                        {group.map((team, tkey) => {
                                            return (
                                                <tbody key={tkey}>
                                                    <tr>
                                                        <td>
                                                            <img
                                                                className="teams-logos"
                                                                src={team.team.logo}
                                                                alt={"team-logo"}
                                                            />{" "}
                                                            <Link to={`/team/${team.team.id}`}>{team.team.name}</Link>
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
                                                </tbody>
                                            );
                                        })}
                                    </table>
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : error ? (
                <h2>{error}</h2>
            ) : (
                <h1>Cargando...</h1>
            )}
        </div>
    );
}

export default Home;
