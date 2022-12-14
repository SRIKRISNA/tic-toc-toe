import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = (props) => {
  // const [value, setValue]=useState(null);
  return (
    <button className='square' onClick={props.onClickEvent}>
      {props.value}
    </button>
  )
}

const Board = () => {
  // const intialSquares = [null, null, null, null, null, null, null, null, null] or write as below line
  const intialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(intialSquares);
  const [xIsNext, setXIsNext] = useState(true);
  const handleClickEvent = (i) => {
    // alert(`square ${i} clicked`)
    //1. make a copy of squares state array
    const newSquares = [...squares];

    //winner or box filled must end game
    const winnerDeclared = Boolean(calculateWinner(newSquares));
    const squareFilled = Boolean(newSquares[i]);
    if(winnerDeclared || squareFilled){
      return;   //no entry takes
    }
    //2. mutate the copy, setting the i-th element to "X"
    newSquares[i] = xIsNext ? 'A' : 'B'
    //3. call the setSquares function with the mutated copy
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };
  const renderSquare = (i) => {
    return(
      <Square value={squares[i]} 
      onClickEvent = {() => handleClickEvent(i)}/>
    )
  }

  const winner = calculateWinner(squares);
  const status = winner ? 
  `Winner: ${winner}` :
  `Next Player : ${xIsNext ? 'A' : 'B'}`

  return (
    <div >
      <div className='status'>{status}</div>
      <div className='board-row'>
        {renderSquare(0)} {renderSquare(1)}{renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)} {renderSquare(4)}{renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)} {renderSquare(7)}{renderSquare(8)}
      </div>
    </div>
  )
}

const Game = () => {
  const handleStartGame = () => {
    window.location.reload();
  }
  return (
    <div className='game'>
      Game
      <Board />
      <button type='button' className='start-btn' onClick={handleStartGame}>Start New Game</button>
    </div>
  )
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)

function calculateWinner(squares){
  const lines = [
    [0,1,2], [3,4,5], [6,7,8], //rows
    [0,3,6], [1,4,7], [2,5,8], //columns
    [0,4,8], [2,4,6] //diagonal
  ];

  for(let line of lines) {
    const [a, b, c] = line;

    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a]; //'x' or 'O'
    }
  }
  return null;
}