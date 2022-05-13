import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import Home from "./components/Home/Home.jsx";
import Teams from "./components/Teams/Team.jsx";
import Player from "./components/Player/Player.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavBar />}>
                    <Route index element={<Home />} />
                    <Route path="team/:teamId" element={<Teams />} />
                    <Route path="player/:playerId" element={<Player />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
