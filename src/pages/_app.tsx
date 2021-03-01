// este arquivo é responsável pelos Components fixos da aplicação, por exemplo a Sidebar

import '../styles/global.css'

import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdowContext';

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
        <Component {...pageProps} />
    </ChallengesProvider>
  )
}

export default MyApp
