import { Route, Routes } from "react-router";
import Home from "./components/Home/Home.jsx";
import Teams from "./components/Teams/Team.jsx";
import Player from "./components/Player/Player.jsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/team/:teamId" element={<Teams />} />
                <Route path="/player/:playerId" element={<Player />} />
            </Routes>
        </>
    );
}

export default App;
