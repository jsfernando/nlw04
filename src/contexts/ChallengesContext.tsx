import { createContext, useState, ReactNode } from 'react';

// desafios importados arquivo json
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}


interface ChallengesContextData {   
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void; 
    
}
interface ChallengesProviderProps{
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps ){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    // estado do desafio (challenge)
    const [activeChallenge, setActiveChallenge] = useState(null)

    function levelUp() {
        setLevel(level + 1);
    }

    // starta o Desafio
    function startNewChallenge(){
        // pega um desafio randomico da lista de desafios arquivo challenge.json lin4
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        // recebe um dos desafios
        const challenge = challenges[randomChallengeIndex];

        // iniciando o estado do desafio(challenge)
        setActiveChallenge(challenge)
    }

    return(
        <ChallengesContext.Provider 
            value={{ 
                level, 
                currentExperience, 
                challengesCompleted, 
                activeChallenge,
                levelUp,
                startNewChallenge 
                }}
        >
            {children}
        </ChallengesContext.Provider>
    )
}