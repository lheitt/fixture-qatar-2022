import { GET_STANDINGS, GET_TEAM, GET_PLAYER } from "../actions";

const initialState = {
    standings: undefined,
    team: undefined,
    player: undefined,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STANDINGS:
            if (Array.isArray(action.payload.errors) === true) {
                action.payload.response[0].league.standings.forEach((group) => {
                    group.sort((a, b) => {
                        if (a.rank > b.rank) return 1;
                        return -1;
                    });
                });

                return {
                    ...state,
                    standings: action.payload.response[0],
                };
            } else {
                return {
                    ...state,
                    standings: action.payload.errors.requests
                        ? { request: "Se excedió el límite de llamados a la API, intente nuevamente mañana" }
                        : { error: "Ocurrió un error, intente nuevamente" },
                };
            }

        case GET_TEAM:
            if (action.payload === undefined) {
                return {
                    ...state,
                    team: undefined,
                };
            } else if (Array.isArray(action.payload.errors) === true) {
                return {
                    ...state,
                    team: action.payload.response[0],
                };
            } else {
                return {
                    ...state,
                    team: action.payload.errors.requests
                        ? { request: "Se excedió el límite de llamados a la API, intente nuevamente mañana" }
                        : { error: "Ocurrió un error, intente nuevamente" },
                };
            }

        case GET_PLAYER:
            if (action.payload === undefined) {
                return {
                    ...state,
                    player: undefined,
                };
            } else if (Array.isArray(action.payload.errors) === true && action.payload.response.length !== 0) {
                return {
                    ...state,
                    player: action.payload.response[0],
                };
            } else {
                return {
                    ...state,
                    player:
                        action.payload.response.length === 0
                            ? { noInfo: "No hay información acerca del jugador elegido" }
                            : action.payload.errors.request
                            ? { request: "Se excedió el límite de llamados a la API, intente nuevamente mañana" }
                            : { error: "Ocurrió un error, intente nuevamente" },
                };
            }

        default:
            return state;
    }
};

export default reducer;
