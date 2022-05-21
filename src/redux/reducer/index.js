import { GET_STANDINGS, GET_TEAM, GET_PLAYER, GET_COACH, GET_FIXTURES } from "../actions";

const initialState = {
    standings: undefined,
    teams: {},
    coachs: {},
    players: {},
    fixtures: undefined,
    error: {},
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
                    error: action.payload.errors.requests
                        ? { request: "Se excedió el límite de llamados a la API, intente nuevamente mañana" }
                        : action.payload.errors.rateLimit
                        ? {
                              rateLimit:
                                  "Se realizó muchos llamados a la API en poco tiempo, intente nuevamente en 1 minuto",
                          }
                        : { error: "Ocurrió un error, intente recargar la página" },
                };
            }

        case GET_TEAM:
            if (Array.isArray(action.payload.errors) === true) {
                return {
                    ...state,
                    teams: {
                        ...state.teams,
                        [action.payload.response[0].team.id]: action.payload.response[0],
                    },
                };
            } else {
                return {
                    ...state,
                    error: action.payload.errors.requests
                        ? { request: "Se excedió el límite de llamados a la API, intente nuevamente mañana" }
                        : action.payload.errors.rateLimit
                        ? {
                              rateLimit:
                                  "Se realizó muchos llamados a la API en poco tiempo, intente nuevamente en 1 minuto",
                          }
                        : { error: "Ocurrió un error, intente recargar la página" },
                };
            }

        case GET_COACH:
            if (Array.isArray(action.payload.errors) === true) {
                return {
                    ...state,
                    coachs: {
                        ...state.coachs,
                        [action.teamId]: action.payload.response[0],
                    },
                };
            } else {
                return {
                    ...state,
                    coachs: {
                        ...state.coachs,
                        [action.teamId]: undefined,
                    },
                };
            }

        case GET_PLAYER:
            if (Array.isArray(action.payload.errors) === true && action.payload.response.length !== 0) {
                return {
                    ...state,
                    players: {
                        ...state.players,
                        [action.playerId]: action.payload.response[0],
                    },
                };
            } else if (action.payload.response.length === 0) {
                return {
                    ...state,
                    players: {
                        ...state.players,
                        [action.playerId]: {
                            noInfo: "No hay información acerca del jugador elegido",
                        },
                    },
                };
            } else {
                return {
                    ...state,
                    error: action.payload.errors.requests
                        ? { request: "Se excedió el límite de llamados a la API, intente nuevamente mañana" }
                        : action.payload.errors.rateLimit
                        ? {
                              rateLimit:
                                  "Se realizó muchos llamados a la API en poco tiempo, intente nuevamente en 1 minuto",
                          }
                        : { error: "Ocurrió un error, intente recargar la página" },
                };
            }

        case GET_FIXTURES:
            if (Array.isArray(action.payload.errors) === true) {
                let fixtureByDayObj = {};
                let fixtureByDayArr = [];

                action.payload.response.forEach((fixture) => {
                    fixtureByDayObj.hasOwnProperty(new Date(fixture.fixture.date).getDate())
                        ? fixtureByDayObj[new Date(fixture.fixture.date).getDate()].push(fixture)
                        : (fixtureByDayObj[new Date(fixture.fixture.date).getDate()] = [fixture]);
                });

                let d = 21;
                while (d !== 3) {
                    fixtureByDayArr.push(fixtureByDayObj[d]);
                    d !== 30 ? d++ : (d = 1);
                }

                return {
                    ...state,
                    fixtures: fixtureByDayArr,
                };
            } else {
                return {
                    ...state,
                    error: action.payload.errors.requests
                        ? { request: "Se excedió el límite de llamados a la API, intente nuevamente mañana" }
                        : action.payload.errors.rateLimit
                        ? {
                              rateLimit:
                                  "Se realizó muchos llamados a la API en poco tiempo, intente nuevamente en 1 minuto",
                          }
                        : { error: "Ocurrió un error, intente recargar la página" },
                };
            }

        default:
            return state;
    }
};

export default reducer;
