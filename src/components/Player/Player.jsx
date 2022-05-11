import "./Player.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiKey from "../../utils/apiKey";

function Player() {
    useEffect(() => {
        getPlayer();

        // eslint-disable-next-line
    }, []);

    const { playerId } = useParams();
    const [error, setError] = useState("");
    const [player, setPlayer] = useState(undefined);

    const getPlayer = async () => {
        const res = await axios.get(`https://v3.football.api-sports.io/players?id=${playerId}&season=2022`, {
            headers: {
                "x-apisports-key": apiKey,
            },
        });

        Array.isArray(res.data.errors) === true ? setPlayer(res.data.response[0]) : setError(res.data.errors.requests);
    };

    return (
        <div>
            {player ? (
                <div>
                    <h1>{`${player.player.firstname} ${player.player.lastname}`}</h1>
                    <img src={player.player.photo} alt="player-img" />
                    <hr />

                    <h4>Edad: {player.player.age}</h4>
                    <h4>Fecha de Nacimiento: {player.player.birth.date}</h4>
                    <h4>Lugar de Nacimiento: {`${player.player.birth.place}, ${player.player.birth.country}`}</h4>
                    <h4>Altura: {player.player.height}</h4>
                    <h4>Peso: {player.player.weight}</h4>
                    <h4>Posición: {player.statistics[0].games.position}</h4>
                    <hr />

                    <h3>Estadísticas en {player.statistics[0].league.name}</h3>
                    <h4>Partidos jugados: {player.statistics[0].games.appearences}</h4>
                    <h4>Minutos jugados: {player.statistics[0].games.minutes}</h4>
                    <h4>Tiros al arco: {player.statistics[0].shots.on}</h4>
                    <h4>Goles: {player.statistics[0].goals.total}</h4>
                    <h4>
                        Promedio de Gol:{" "}
                        {(player.statistics[0].shots.on / player.statistics[0].goals.total).toPrecision(3)}
                    </h4>
                    <h4>Pases: {player.statistics[0].passes.total}</h4>
                    <h4>Faltas recibidas: {player.statistics[0].fouls.drawn}</h4>
                    <h4>Faltas cometidas: {player.statistics[0].fouls.committed}</h4>
                    <h4>Tarjetas amarillas: {player.statistics[0].cards.yellow}</h4>
                    <h4>Tarjetas rojas: {player.statistics[0].cards.red}</h4>
                    <h4>Penales convertidos: {player.statistics[0].penalty.scored || 0}</h4>
                    <h4>Penales fallados: {player.statistics[0].penalty.missed}</h4>
                    <h4>Penales cometidos: {player.statistics[0].penalty.commited || 0}</h4>
                </div>
            ) : error ? (
                <h2>{error}</h2>
            ) : (
                <h1>Cargando...</h1>
            )}
        </div>
    );
}

export default Player;
