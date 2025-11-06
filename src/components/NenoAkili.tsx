import React, { useState, useEffect, useCallback } from 'react';
import { words } from '@/lib/words';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const MAX_ATTEMPTS = 6;

const NenoAkili: React.FC = () => {
  const [secretWord, setSecretWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [guess, setGuess] = useState('');
  const [remainingAttempts, setRemainingAttempts] = useState(MAX_ATTEMPTS);

  const startNewGame = useCallback(() => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    setSecretWord(newWord);
    setGuessedLetters([]);
    setRemainingAttempts(MAX_ATTEMPTS);
    setGuess('');
    toast.success('New game started! Good luck!');
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.length !== 1 || !/[a-zA-Z]/.test(guess)) {
      toast.error('Please enter a single letter.');
      return;
    }

    const letter = guess.toUpperCase();

    if (guessedLetters.includes(letter)) {
      toast.info('You already guessed that letter.');
      setGuess('');
      return;
    }

    setGuessedLetters([...guessedLetters, letter]);

    if (secretWord.includes(letter)) {
      toast.success(`Correct! The letter '${letter}' is in the word.`);
    } else {
      setRemainingAttempts(remainingAttempts - 1);
      toast.error(`Wrong! The letter '${letter}' is not in the word.`);
    }

    setGuess('');
  };

  const displayWord = secretWord
    .split('')
    .map((letter) => (guessedLetters.includes(letter) ? letter : '_'))
    .join(' ');

  const incorrectGuesses = guessedLetters.filter((letter) => !secretWord.includes(letter));

  const isWin = secretWord && !displayWord.includes('_');
  const isLoss = remainingAttempts === 0;

  return (
    <Card className='w-full max-w-md mx-auto shadow-2xl bg-white/80 backdrop-blur-sm'>
      <CardHeader className='text-center'>
        <CardTitle className='text-4xl font-bold tracking-widest text-gray-800'>NENO AKILI</CardTitle>
      </CardHeader>
      <CardContent>
        {isWin || isLoss ? (
          <div className='text-center space-y-4'>
            <h2 className={`text-3xl font-bold ${isWin ? 'text-green-600' : 'text-red-600'}`}>
              {isWin ? 'Congratulations, You Won!' : 'Game Over, You Lost!'}
            </h2>
            <p className='text-xl'>The word was: <span className='font-bold tracking-wider'>{secretWord}</span></p>
            <Button onClick={startNewGame} size='lg' className='mt-4'>
              Play Again
            </Button>
          </div>
        ) : (
          <div className='space-y-6'>
            <div className='text-center'>
              <p className='text-4xl font-mono tracking-[0.2em]'>{displayWord}</p>
            </div>
            <form onSubmit={handleGuess} className='flex gap-2'>
              <Input
                type='text'
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                maxLength={1}
                className='text-center text-lg'
                placeholder='Guess a letter'
                disabled={isWin || isLoss}
              />
              <Button type='submit' disabled={isWin || isLoss}>
                Guess
              </Button>
            </form>
            <div className='text-center space-y-2'>
              <p>Remaining Attempts: <span className='font-bold text-xl'>{remainingAttempts}</span></p>
              {incorrectGuesses.length > 0 && (
                <p>Incorrect Guesses: <span className='font-mono text-red-500 tracking-wider'>{incorrectGuesses.join(', ')}</span></p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NenoAkili;
