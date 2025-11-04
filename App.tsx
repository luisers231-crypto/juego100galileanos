
import React, { useState, useCallback, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import Scoreboard from './components/Scoreboard';
import StrikeIndicator from './components/StrikeIndicator';
import Modal from './components/Modal';
import { GameStatus, type Answer, type RoundData } from './types';
import { generateRoundData } from './services/geminiService';

const MAX_ROUNDS = 3;
const MAX_STRIKES = 3;

// Helper to normalize strings for comparison
const normalizeString = (str: string) => {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
};


const App: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Start);
  const [roundData, setRoundData] = useState<RoundData | null>(null);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [roundPoints, setRoundPoints] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [strikes, setStrikes] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  
  const [guess, setGuess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const startNewRound = useCallback(async () => {
    setGameStatus(GameStatus.Loading);
    setErrorMessage('');
    setStatusMessage('');
    setRoundData(null);
    setGuess('');
    setRoundPoints(0);
    setStrikes(0);

    try {
      const data = await generateRoundData();
      setRoundData(data);
      setCurrentRound(prev => prev + 1);
      setGameStatus(GameStatus.Playing);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Ocurrió un error desconocido.");
      }
      setGameStatus(GameStatus.Start); // Or an error state
    }
  }, []);

  const resetGame = useCallback(() => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setCurrentRound(0);
    setCurrentPlayer(1);
    startNewRound();
  }, [startNewRound]);

  const endRound = useCallback((winnerId: number) => {
    if (winnerId === 1) {
      setPlayer1Score(prev => prev + roundPoints);
    } else {
      setPlayer2Score(prev => prev + roundPoints);
    }
    setGameStatus(GameStatus.RoundOver);
    // Reveal all answers
    setRoundData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        answers: prev.answers.map(a => ({ ...a, revealed: true }))
      };
    });
  }, [roundPoints]);


  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guess.trim() || !roundData) return;

    const normalizedGuess = normalizeString(guess);
    const matchedAnswer = roundData.answers.find(
      (ans) => !ans.revealed && normalizeString(ans.text) === normalizedGuess
    );

    if (matchedAnswer) {
      // Correct guess
      setRoundData(prev => {
        if (!prev) return null;
        const newAnswers = prev.answers.map(a =>
          a.text === matchedAnswer.text ? { ...a, revealed: true } : a
        );
        return { ...prev, answers: newAnswers };
      });
      setRoundPoints(prev => prev + matchedAnswer.points);
      setStrikes(0);
      setStatusMessage(`¡Correcto! ${matchedAnswer.points} puntos.`);
      setGuess('');

      // Check if all answers revealed
      const allRevealed = roundData.answers.every(a => a.revealed || a.text === matchedAnswer.text);
      if (allRevealed) {
        endRound(currentPlayer);
      }

    } else {
      // Incorrect guess
      const newStrikes = strikes + 1;
      setStrikes(newStrikes);
      setStatusMessage(`Incorrecto. ¡Strike ${newStrikes}!`);
      
      if (gameStatus === GameStatus.StealAttempt) {
        const opponent = currentPlayer === 1 ? 2 : 1;
        setStatusMessage(`¡Fallo! El Jugador ${opponent} se lleva los puntos.`);
        endRound(opponent);
      } else if (newStrikes >= MAX_STRIKES) {
        setStatusMessage(`¡3 strikes! Oportunidad de robo para el Jugador ${currentPlayer === 1 ? 2 : 1}.`);
        setCurrentPlayer(prev => (prev === 1 ? 2 : 1));
        setGameStatus(GameStatus.StealAttempt);
      }
    }
    setGuess('');
  };
  
  const handleNextAction = () => {
    if (gameStatus === GameStatus.RoundOver) {
        if (currentRound >= MAX_ROUNDS) {
            setGameStatus(GameStatus.GameOver);
        } else {
            startNewRound();
        }
    } else if (gameStatus === GameStatus.GameOver) {
        resetGame();
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 bg-gradient-to-br from-slate-900 to-blue-900/50 text-white p-4 flex flex-col items-center justify-center">
      <header className="w-full text-center my-4">
        <h1 className="text-4xl sm:text-6xl font-bold font-orbitron text-cyan-300 drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]">
          100 GALILEANOS DICEN
        </h1>
        {currentRound > 0 && <p className="text-xl text-slate-300 mt-2">Ronda {currentRound} de {MAX_ROUNDS}</p>}
      </header>

      {gameStatus === GameStatus.Start && (
        <div className="text-center">
            <p className="text-xl mb-8 max-w-2xl">Un juego de trivia sobre ecología humana. Adivina las respuestas más populares a preguntas generadas por IA. ¡Invita a un amigo y demuestra quién sabe más!</p>
            <button onClick={startNewRound} className="bg-cyan-600 text-white font-bold py-4 px-8 rounded-lg text-2xl hover:bg-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-400/50 transform hover:scale-105 transition-transform">
                Comenzar Juego
            </button>
            {errorMessage && <p className="text-red-400 mt-4">{errorMessage}</p>}
        </div>
      )}

      {gameStatus === GameStatus.Loading && (
        <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-cyan-400 mx-auto"></div>
            <p className="text-2xl mt-8 font-orbitron">Generando nueva ronda...</p>
        </div>
      )}

      {(gameStatus === GameStatus.Playing || gameStatus === GameStatus.StealAttempt) && roundData && (
        <main className="w-full flex flex-col items-center flex-grow">
          <Scoreboard 
            player1Score={player1Score} 
            player2Score={player2Score} 
            currentPlayer={currentPlayer}
            roundPoints={roundPoints}
          />
          <GameBoard question={roundData.question} answers={roundData.answers} />
          
          <div className="w-full max-w-4xl mt-4">
            <p className="text-center text-xl h-8 font-bold">
                {gameStatus === GameStatus.StealAttempt ? 
                    <span className="text-yellow-400 animate-pulse">¡Jugador {currentPlayer}, A ROBAR!</span> :
                    <span className="text-emerald-300">{statusMessage}</span>
                }
            </p>
            {gameStatus !== GameStatus.StealAttempt && <StrikeIndicator strikes={strikes} />}
            
            <form onSubmit={handleGuessSubmit} className="flex flex-col sm:flex-row gap-2 mt-2">
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder={`Turno del Jugador ${currentPlayer}...`}
                className="flex-grow bg-slate-700 border-2 border-slate-500 rounded-lg p-3 text-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button type="submit" className="bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-colors">
                Responder
              </button>
            </form>
          </div>
        </main>
      )}

      {(gameStatus === GameStatus.RoundOver) && (
        <Modal 
            title={`Fin de la Ronda ${currentRound}`} 
            buttonText={currentRound >= MAX_ROUNDS ? "Ver Resultados Finales" : "Siguiente Ronda"} 
            onButtonClick={handleNextAction}
        >
            <p>¡La ronda ha terminado! Los puntos han sido sumados. Prepárate para la siguiente.</p>
        </Modal>
      )}

      {(gameStatus === GameStatus.GameOver) && (
        <Modal 
            title="¡Fin del Juego!" 
            buttonText="Jugar de Nuevo"
            onButtonClick={handleNextAction}
        >
            {player1Score > player2Score && <p>¡El Jugador 1 es el ganador con {player1Score} puntos!</p>}
            {player2Score > player1Score && <p>¡El Jugador 2 es el ganador con {player2Score} puntos!</p>}
            {player1Score === player2Score && <p>¡Es un empate con {player1Score} puntos!</p>}
        </Modal>
      )}

    </div>
  );
};

export default App;
