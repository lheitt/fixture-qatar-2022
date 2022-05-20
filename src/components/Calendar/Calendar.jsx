import { Carousel } from "react-bootstrap";
import jsonFixture from "../../json/forTest/Fixture.json";

const Calendar = () => {
    let fixtureByDay = {
        21: [],
        22: [],
        23: [],
        24: [],
        25: [],
        26: [],
        27: [],
        28: [],
        29: [],
        30: [],
        1: [],
        2: [],
    };

    jsonFixture.response.forEach((fixture) => {
        fixtureByDay[new Date(fixture.fixture.date).getDate()].push(fixture);
    });

    console.log(fixtureByDay);

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
        <div>
            <h1 className="text-center p-5">Próximamente...</h1>
            {/* <Carousel>
                {jsonFixture.response.map((fixture, key) => {
                    return (
                        <Carousel.Item variant="dark" key={key}>
                            <div>{dateArg(fixture.fixture.date)}</div>
                        </Carousel.Item>
                    );
                })}
            </Carousel> */}
        </div>
    );
};

export default Calendar;
