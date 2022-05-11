import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./components/Home/Home";
import Teams from "./components/Teams/Team";
import Player from "./components/Player/Player";

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
