import { BrowserRouter } from 'react-router-dom';
import './assets/css/tailwind.css';
import './assets/css/reset.css';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import AppRouter from './router/router';
import Contents from './components/layouts/Contents';
import GlobalStyle from './assets/styles/GlobalStyle';

function App(): JSX.Element {
    return (
        <>
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
        </>
    );
}

export default App;
