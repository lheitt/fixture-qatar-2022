import "../../scss/Home.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiKey from "../../utils/apiKey";
import json from "../../json/Standings.json";
import teamNames from "../../json/TeamNames.json";

const Home = () => {
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

        // if (Array.isArray(res.data.errors) === true) {
        //     res.data.response[0].league.standings.forEach((group) => {
        //         group.sort((a, b) => {
        //             if (a.rank > b.rank) return 1;
        //             return -1;
        //         });
        //     });
        //     setStanding(res.data.response[0]);
        // } else {
        //     setError(res.data.errors.requests);
        // }

        let res = json.response[0];
        res.league.standings.forEach((group) => {
            group.sort((a, b) => {
                if (a.rank > b.rank) return 1;
                return -1;
            });
        });

        setStanding(res);
    };

    return (
        <div className="home-container">
            {standing ? (
                <>
                    <div className="world-cup-container">
                        <img className="world-cup-logo" src={standing.league.logo} alt="world-cup-logo" />
                    </div>
                    <hr />
                    <div className="groups">
                        {standing.league.standings.map((group, gkey) => {
                            return (
                                <div className="group" key={gkey}>
                                    <h2>{"Grupo " + group[0].group[6]}</h2>
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th className="text-start ps-3">Equipo</th>
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
                                                    <tr
                                                        className={
                                                            team.rank === 1 || team.rank === 2
                                                                ? "table-success"
                                                                : "table-danger"
                                                        }
                                                    >
                                                        <td className="d-flex justify-content-start align-items-center flex-wrap align-content-center">
                                                            <div className="teams-logo-container">
                                                                <img
                                                                    className="teams-logos"
                                                                    src={team.team.logo}
                                                                    alt={"team-logo"}
                                                                />
                                                            </div>
                                                            <Link className="ps-2" to={`/team/${team.team.id}`}>
                                                                {teamNames.hasOwnProperty(team.team.name)
                                                                    ? teamNames[team.team.name]
                                                                    : team.team.name}
                                                            </Link>
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
};

export default Home;
