import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import Home from "./components/Home/Home.jsx";
import Teams from "./components/Teams/Team.jsx";
import Player from "./components/Player/Player.jsx";
import Calendar from "./components/Calendar/Calendar.jsx";
import Stadiums from "./components/Stadiums/Stadiums.jsx";
import Symbols from "./components/Symbols/Symbols.jsx";
import Statistics from "./components/Statistics/Statistics.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavBar />}>
                    <Route index element={<Home />} />
                    <Route path="team/:teamId" element={<Teams />} />
                    <Route path="player/:playerId" element={<Player />} />
                    <Route path="calendar" element={<Calendar />} />
                    <Route path="stadiums" element={<Stadiums />} />
                    <Route path="symbols" element={<Symbols />} />
                    <Route path="statistics" element={<Statistics />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
