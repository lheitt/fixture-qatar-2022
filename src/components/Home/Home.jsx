import "../../scss/Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { getStandings } from "../../redux/actions";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import teamNames from "../../json/TeamNames.json";

const Home = () => {
    document.title = "Inicio | Qatar 2022";
    const dispatch = useDispatch();
    const standing = useSelector((state) => state.standings);
    const error = useSelector((state) => state.error);

    useEffect(() => {
        if (!standing) dispatch(getStandings());
    }, [dispatch, standing]);

    return (
        <div className="home-container">
            {error.request ? (
                <h2>{error.request}</h2>
            ) : error.rateLimit ? (
                <h2>{error.rateLimit}</h2>
            ) : error.error ? (
                <h2>{error.error}</h2>
            ) : standing?.league ? (
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
            ) : (
                <h1>Cargando...</h1>
            )}
        </div>
    );
};

export default Home;
