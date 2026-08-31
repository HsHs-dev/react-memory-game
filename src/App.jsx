function App() {
  const MAX_VAL = 8;

  let seq = [];

  function getRandomInt() {
    return Math.floor(Math.random() * MAX_VAL);
  }

  function generateSeq() {
    let rand = getRandomInt();
    if (seq.length === 0) {
      seq.push(rand);
    } else {
      while (rand === seq[seq.length - 1]) rand = getRandomInt();
      seq.push(rand);
    }
  }

  let playing = true;

  while (playing) {
    generateSeq();
    console.log(seq);
    for (const x of seq) {
      const guess = parseInt(prompt("Enter seq"));
      if (guess !== x) {
        alert("WRONG!");
        playing = false;
        break;
      }
    }
  }

  return <h1>Hello</h1>;
}

export default App;
