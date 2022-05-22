import "../../scss/Calendar.scss";
import { useDispatch, useSelector } from "react-redux";
import { getFixtures } from "../../redux/actions";
import { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import teamNames from "../../assets/json/TeamNames.json";

const Calendar = () => {
    document.title = "Calendario | Qatar 2022";
    const dispatch = useDispatch();
    const calendar = useSelector((state) => state.fixtures);
    const error = useSelector((state) => state.error);

    useEffect(() => {
        if (!calendar) dispatch(getFixtures());
    }, [dispatch, calendar]);

    const dateArg = (dateArg) => {
        let date = new Date(dateArg.slice(0, 19));

        return new Date(
            Date.UTC(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds()
            )
        ).toLocaleString("es", {
            timeZone: "America/Argentina/Buenos_Aires",
            timeZoneName: "short",
        });
    };

    return (
        <div className="calendar-container">
            {error.request ? (
                <h2>{error.request}</h2>
            ) : error.rateLimit ? (
                <h2>{error.rateLimit}</h2>
            ) : error.error ? (
                <h2>{error.error}</h2>
            ) : calendar ? (
                <Carousel variant="dark" interval={null} indicators={false} className="text-center p-5">
                    {calendar.map((day, keyd) => {
                        return (
                            <Carousel.Item key={keyd}>
                                <h1>
                                    Partidos del día{" "}
                                    {dateArg(day[0].fixture.date).slice(0, 5) === "1/12/" ||
                                    dateArg(day[0].fixture.date).slice(0, 5) === "2/12/"
                                        ? "0" + dateArg(day[0].fixture.date).slice(0, 4).replace("/", "-")
                                        : dateArg(day[0].fixture.date).slice(0, 5).replace("/", "-")}
                                </h1>
                                {day.map((fixture, keyf) => {
                                    return (
                                        <div key={keyf} className="mb-4">
                                            <h5>{dateArg(fixture.fixture.date).slice(11)}</h5>
                                            <div className="fixture">
                                                <img
                                                    className="team-logo-fixture"
                                                    src={fixture.teams.home.logo}
                                                    alt="home-team-logo"
                                                />
                                                <h6 className="teams-names">
                                                    {teamNames.hasOwnProperty(fixture.teams.home.name)
                                                        ? teamNames[fixture.teams.home.name]
                                                        : fixture.teams.home.name}{" "}
                                                    vs{" "}
                                                    {teamNames.hasOwnProperty(fixture.teams.away.name)
                                                        ? teamNames[fixture.teams.away.name]
                                                        : fixture.teams.away.name}
                                                </h6>
                                                <img
                                                    className="team-logo-fixture"
                                                    src={fixture.teams.away.logo}
                                                    alt="away-team-logo"
                                                />
                                            </div>
                                            <p>
                                                {fixture.fixture.venue.name}, {fixture.fixture.venue.city}
                                            </p>
                                        </div>
                                    );
                                })}
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
            ) : (
                <h1>Cargando ...</h1>
            )}
        </div>
    );
};

export default Calendar;
