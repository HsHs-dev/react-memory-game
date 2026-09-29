import { Routes, Route } from "react-router"
import Play from "./routes/Play";
import Leaderboard from "./routes/Leaderboard";
import RootLayout from "./layouts/RootLayout";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Play />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Route>
    </Routes>
  )
}

export default App;
