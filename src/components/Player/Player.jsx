import "../../scss/Player.scss";
import { useDispatch, useSelector } from "react-redux";
import { getPlayer } from "../../redux/actions";
import { useEffect } from "react";
import { useParams } from "react-router";
import teamNames from "../../json/TeamNames.json";
import playerPosition from "../../json/PlayerPosition.json";
import competitionName from "../../json/CompetitionNames.json";

const Player = () => {
    const { playerId } = useParams();
    const dispatch = useDispatch();
    const player = useSelector((state) => state.players[playerId]);
    const error = useSelector((state) => state.error);

    useEffect(() => {
        if (!player) dispatch(getPlayer(playerId));
    }, [dispatch, playerId, player]);

    return (
        <div>
            {player?.noInfo ? (
                <h2 className="player-container">{player.noInfo}</h2>
            ) : error.request ? (
                <h2 className="player-container">{error.request}</h2>
            ) : error.rateLimit ? (
                <h2 className="player-container">{error.rateLimit}</h2>
            ) : error.error ? (
                <h2 className="player-container">{error.error}</h2>
            ) : player?.player ? (
                <div className="player-container">
                    <div className="player-name">
                        <h1 className="fw-bold">{`${player.player.firstname} ${player.player.lastname}`}</h1>
                        <img className="player-img" src={player.player.photo} alt="player-img" />
                    </div>

                    <div className="player-info">
                        <hr />
                        <h4>Edad: {player.player.age} años</h4>
                        <h4>Fecha de Nacimiento: {player.player.birth.date}</h4>
                        <h4>
                            Lugar de Nacimiento:{" "}
                            {`${player.player.birth.place}, ${
                                teamNames.hasOwnProperty(player.player.birth.country)
                                    ? teamNames[player.player.birth.country]
                                    : player.player.birth.country
                            }`}
                        </h4>
                        <h4>Altura: {player.player.height}</h4>
                        <h4>Peso: {player.player.weight}</h4>
                        <h4>Posición: {playerPosition[player.statistics[0].games.position]}</h4>
                        <hr />
                    </div>

                    <h3 className="mt-3 fw-bold">
                        Estadísticas en{" "}
                        {competitionName.hasOwnProperty(player.statistics[0].league.name)
                            ? competitionName[player.statistics[0].league.name]
                            : player.statistics[0].league.name}
                    </h3>
                    <div className="player-statistics mt-2">
                        <h4>Partidos jugados: {player.statistics[0].games.appearences || 0}</h4>
                        <h4>Minutos jugados: {player.statistics[0].games.minutes || 0}</h4>
                        <h4>Tiros al arco: {player.statistics[0].shots.on || 0}</h4>
                        <h4>Goles: {player.statistics[0].goals.total || 0}</h4>
                        <h4>
                            Promedio de Gol:{" "}
                            {player.statistics[0].shots.on && player.statistics[0].goals.total
                                ? (player.statistics[0].shots.on / player.statistics[0].goals.total).toPrecision(3)
                                : 0}
                        </h4>
                        <h4>Pases: {player.statistics[0].passes.total || 0}</h4>
                        <h4>Faltas recibidas: {player.statistics[0].fouls.drawn || 0}</h4>
                        <h4>Faltas cometidas: {player.statistics[0].fouls.committed || 0}</h4>
                        <h4>Tarjetas amarillas: {player.statistics[0].cards.yellow || 0}</h4>
                        <h4>Tarjetas rojas: {player.statistics[0].cards.red || 0}</h4>
                        <h4>Penales convertidos: {player.statistics[0].penalty.scored || 0}</h4>
                        <h4>Penales fallados: {player.statistics[0].penalty.missed || 0}</h4>
                        <h4>Penales cometidos: {player.statistics[0].penalty.commited || 0}</h4>
                    </div>
                </div>
            ) : (
                <h1 className="player-container">Cargando...</h1>
            )}
        </div>
    );
};

export default Player;
