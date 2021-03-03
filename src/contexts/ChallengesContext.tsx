import { createContext, useState, ReactNode, useCallback, useEffect } from 'react';

// repositório de terceiros DefinitelyTyped = types para repositórios typescript
// yarn add js-cookie
// yarn add @types/js-cookie -D
import Cookies from 'js-cookie';

// desafios importados arquivo json
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}


interface ChallengesContextData {   
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void; 
    resetChallenge: () => void; 
    completeChallenge: () => void; 
    closeLevelUpModal: () => void; 
    
}
interface ChallengesProviderProps{
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;    
}


export const ChallengesContext = createContext({} as ChallengesContextData);
                                            // rest aqui representa as demais variáveis lin 32,33,34
export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps ){
    const [level, setLevel] = useState(rest.level ?? 1); //objeto rest, se não existir level recebe 1
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    // aula5
    // const [level, setLevel] = useState(1);
    // const [currentExperience, setCurrentExperience] = useState(30);
    // const [challengesCompleted, setChallengesCompleted] = useState(0);

    // estado do desafio (challenge)
    const [activeChallenge, setActiveChallenge] = useState(null)
    // aula5 - modal---------
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
    //--------------

    // pow calculo de potencia.
    // 4 e o fator de experiencia, mude esse valor se voce quiser deixar mais facil ou dificil
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);


    useEffect(() => {
        /**
         * Pedindo permição para enviar notificações,
         * Notification e a API nativa do browser
         */
        Notification.requestPermission();
      }, []); // quando passa um array vazio no segundo parâmetro, 
              // significa que a primeira função vai ser executada uma única vez
              // assim que esse component for exibido em Tela.
    
              // Quero dispara uma função () => {}, sempre qua alguma coisa mudar []
                useEffect(() => {
                    Cookies.set('level', String(level))
                    Cookies.set('currentExperience', String(currentExperience))
                    Cookies.set('challengesCompleted', String(challengesCompleted))
                }, [level, currentExperience, challengesCompleted])
            
    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true)
    }

    // fechar o modal - aula5
    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    // starta o Desafio
    function startNewChallenge(){
        // pega um desafio randomico da lista de desafios arquivo challenge.json lin4
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        // recebe um dos desafios
        const challenge = challenges[randomChallengeIndex];

        // iniciando o estado do desafio(challenge)
        setActiveChallenge(challenge)
        
        // Audio API nativa do Browser
        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
        new Notification('Novo desafio', {
            body: `Valendo ${challenge.amount}xp`,
        });
        }

        
    }

    const resetChallenge = useCallback(() => {
        setActiveChallenge(null);
      }, []);
    
      const completeChallenge = useCallback(() => {
          // se Eu não tiver com um desafio 
        if (!activeChallenge) {
          return; // return void
        }
    
        const { amount } = activeChallenge;
    
        // let pode receber um novo valor no futuro
        
        let finalExperience = currentExperience + amount;
    
        // calculo da experiencia final do usuario
        //o usuario está com 80 de experiencia
        // vamo supor que ele vai para o nivel 120
        // se ele terminou um desafio que deu 80
        // 80 + 80, já passoud e 120, então vou subir ele de nivel e subtrair 160 - 120 e deixara Ele com 40

        if (finalExperience >= experienceToNextLevel) {
          finalExperience = finalExperience - experienceToNextLevel;
          levelUp();
        }

    
        setActiveChallenge(null); //
        setCurrentExperience(finalExperience); // qdo finalizar o desafio, vou zerar o desafio
        setChallengesCompleted(challengesCompleted + 1); //número de desafios completos
      }, [activeChallenge])
    
    
    return(
        <ChallengesContext.Provider 
            value={{ 
                level, 
                currentExperience, 
                experienceToNextLevel,
                challengesCompleted, 
                activeChallenge,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge, 
                closeLevelUpModal
                }}
        >
            {children}
            {/* && significa ter um if sem else */}
            { isLevelUpModalOpen && <LevelUpModal/> } 

        </ChallengesContext.Provider>
    )
}