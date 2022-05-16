import axios from "axios";
import jsonStandings from "../../json/forTest/Standings.json";
import jsonSquads from "../../json/forTest/Squads.json";
import jsonPlayer from "../../json/forTest/Player.json";
export const GET_STANDINGS = "GET_STANDINGS";
export const GET_TEAM = "GET_TEAM";
export const GET_PLAYER = "GET_PLAYER";

export const getStandings = () => {
    return async (dispatch) => {
        try {
            // const res = await axios.get("https://v3.football.api-sports.io/standings?league=1&season=2022", {
            //     headers: {
            //         "x-apisports-key": process.env.REACT_APP_API_KEY_V1,
            //     },
            // });

            // dispatch({
            //     type: GET_STANDINGS,
            //     payload: res.data,
            // });

            dispatch({
                type: GET_STANDINGS,
                payload: jsonStandings,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getTeam = (teamId) => {
    return async (dispatch) => {
        try {
            if (teamId === "reset") {
                dispatch({
                    type: GET_TEAM,
                    payload: undefined,
                });
            } else if (teamId !== "26") {
                const res = await axios.get(`https://v3.football.api-sports.io/players/squads?team=${teamId}`, {
                    headers: {
                        "x-apisports-key": process.env.REACT_APP_API_KEY_V1,
                    },
                });

                dispatch({
                    type: GET_TEAM,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: GET_TEAM,
                    payload: jsonSquads,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getPlayer = (playerId) => {
    return async (dispatch) => {
        try {
            if (playerId === "reset") {
                dispatch({
                    type: GET_PLAYER,
                    payload: undefined,
                });
            } else if (playerId !== "154") {
                const res = await axios.get(`https://v3.football.api-sports.io/players?id=${playerId}&season=2022`, {
                    headers: {
                        "x-apisports-key": process.env.REACT_APP_API_KEY_V1,
                    },
                });

                dispatch({
                    type: GET_PLAYER,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: GET_PLAYER,
                    payload: jsonPlayer,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};
