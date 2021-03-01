import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdowContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext)

    const { resetCountdown } = useContext(CountdownContext);
    
    function handleChallengeSucceeded() {
        new Audio('/success-bell.wav').play();
        
        completeChallenge();
        resetCountdown();
    }
    
    function handleChallengeFailed() {
        resetChallenge();
        resetCountdown();
    }
    
    
    // const hasActiveChallenge = true;
    return (
        <div className={styles.challengeBoxContainer}>
            {/* { hasActiveChallenge ? ( */}
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>
                        Ganhe {activeChallenge.amount} xp
                    </header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button 
                        type="button"
                        className={styles.challengeFailedButtom}
                        onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>
                        <button 
                        type="button"
                        className={styles.challengeSucceededButtom}
                        onClick={handleChallengeSucceeded}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeBoxNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level UP"/>
                        Avance de Level completando desafios
                    </p>
                </div>                
            )}
        </div>
    )
}