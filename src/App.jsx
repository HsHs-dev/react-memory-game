import { useState } from "react";
import PlayLayout from "./components/PlayLayout";
const MAX_VAL = 8;

function getRandomInt() {
  return Math.floor(Math.random() * MAX_VAL);
}

function generateSeq(seq) {
  console.log(seq);
  let rand = getRandomInt();
  if (seq.length === 0) {
    return [...seq, rand];
  } else {
    while (rand === seq[seq.length - 1]) rand = getRandomInt();
    return [...seq, rand];
  }
}

function App() {
  const [seq, setSeq] = useState([]);
  const [playing, setPlaying] = useState(false);

  const startGame = () => {
    // init sequence
    setSeq([getRandomInt()]);

    // set The state to playing
    setPlaying(true);
  };

  const handlePlay = () => {
    console.log(seq);
    for (const x of seq) {
      const guess = parseInt(prompt("Enter sequence:"));
      if (guess !== x) {
        alert("WRONG!");
        setPlaying(false);
        return;
      }
    }
    setSeq((prevSeq) => generateSeq(prevSeq));
  };

  return <PlayLayout />;
}

export default App;
