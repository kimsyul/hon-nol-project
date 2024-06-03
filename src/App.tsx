import { BrowserRouter } from 'react-router-dom';
import './assets/css/tailwind.css';
import './assets/css/reset.css';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import AppRouter from './router/router';
import Contents from './components/layouts/Contents';
import GlobalStyle from './assets/styles/GlobalStyle';
import { FirebaseProvider } from './FirebaseContext';

function App(): JSX.Element {
    return (
        <FirebaseProvider>
            <GlobalStyle />
            <BrowserRouter>
                <section>
                    <Header />
                    <Contents>
                        <AppRouter />
                    </Contents>
                    <Footer />
                </section>
            </BrowserRouter>
        </FirebaseProvider>
    );
}

export default App;
