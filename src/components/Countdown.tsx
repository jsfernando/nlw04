import { useContext } from 'react'; // useEffect é um hook
import { CountdownContext } from '../contexts/CountdowContext';
import styles from '../styles/components/Countdown.module.css';

// let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    // const { startNewChallenge } = useContext(ChallengesContext)

    // const [time, setTime] = useState(0.1 * 60);
    // const [isActive, setIsActive] = useState(false);
    // const [hasFinished, setHasFinished] =  useState(false);
    // const minutes =  Math.floor(time/60); // floor arredonda pra baixo
    // const seconds = time % 60;

    // convertendo minutos para string e o padStar pega a segunda parte do número '2' '5', se for '0' '5' e o split volta um array
    // const [ m...left, m...right] é uma desconstrução do javascript

    const { minutes, 
            seconds, 
            hasFinished, 
            isActive, 
            startCountdown, 
            resetCountdown 
        } = useContext(CountdownContext)


    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    // function startCountdown(){
    //     setIsActive(true); //mudando o estado quando o botão for clicado
    // }
    // function resetCountdown(){
    //     clearTimeout(countdownTimeout); //cancelando a execução de um timeout
    //     setIsActive(false);
    //     setTime(0.1*60);
    // }

    // Os hooks(funcao) serve para disparar/executar efeitos colaterais 
        // (quando algo mudar ou quando algo acontecer) quero disparar algo
    // 2 parâmetros
    // 1- o que Eu quero executar e sempre será um função arrow function
    // 2- quando que Eu quero executar
    // useEffect( ()=> {
    //     if(isActive && time > 0){
    //         countdownTimeout = setTimeout( ()=> {
    //             setTime(time -1);
    //         }, 1000)
    //     } else if (isActive && time == 0) {
    //         setHasFinished(true);
    //         setIsActive(false);
    //         startNewChallenge();
    //     }
    // }, [isActive, time]) // quero executar uma função ...sempre que o valor de isActive mudar...

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            
            {/* // if ternário somente com o then, sem o else
            { hasFinished && ( 
                console.log("terminou...")
                )} 
            */}

            { hasFinished ? ( 
                <button 
                disabled
                type="button" 
                className={styles.countdownButton}
                >
                Ciclo encerrado 
                </button>

                ) : (
                    <>
                    { isActive ? (
                        <button 
                            type="button" 
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                            onClick={resetCountdown}
                        >
                            Abandonar ciclo
                        </button>
                    ) : (
                        <button 
                        type="button" 
                        className={styles.countdownButton}
                        onClick={startCountdown}
                        >
                            Iniciar ciclo
                        </button>
                    ) }
                    </>
                )

            }




        </div>
    )
}