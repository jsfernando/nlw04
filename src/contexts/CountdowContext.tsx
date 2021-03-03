import { createContext, ReactNode, useEffect, useState, useContext } from "react";
import { ChallengesContext } from "./ChallengesContext";

// import { useChallenge } from './contexts/ChallengeContext';

interface ICountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface ICountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext<ICountdownContextData>({} as ICountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: ICountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  // 25 minutos representado em segundos.
  const startTime = 25 * 60

  const [time, setTime] = useState(startTime);
  const [isActive, setIsActive] = useState(false);
  const [hasTimeFinished, setHasTimeFinished] = useState(false);
  const [hasFinished, setHasFinished] =  useState(false);

  const minutes = Math.floor(time / 60); 
  // arredondando minutos para evitar numeros quebrados
  const seconds = time % 60; 
  // resto da divicao

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasTimeFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  function startCountdown() {
    return setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(startTime);
    setHasTimeFinished(false);
  }

  useEffect( ()=> {
    if(isActive && time > 0){
        countdownTimeout = setTimeout( ()=> {
            setTime(time -1);
        }, 1000)
    } else if (isActive && time == 0) {
        setHasFinished(true);
        setIsActive(false);
        startNewChallenge();
    }
}, [isActive, time]) // quero executar uma função ...sempre que o valor de isActive mudar...


  return (
    <CountdownContext.Provider
      value={
        {
          minutes,
          seconds,
          hasTimeFinished,
          isActive,
          startCountdown,
          resetCountdown,
        }
      }
    >
      {children}
    </CountdownContext.Provider>
  )
}

export function useCountdown() {
  const context = useContext(CountdownContext);

  if (!context) {
    throw new Error('useCountdown must be within the CountdownProvider');
  }

  return context;
}
