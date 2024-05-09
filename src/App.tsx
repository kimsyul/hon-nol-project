import { BrowserRouter } from 'react-router-dom';
import './assets/styles/tailwind.css';
import Nav from './components/layouts/Nav';
import GlobalStyle from './assets/styles/GlobalStyle';

function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <section>
          <Nav />
        </section>
      </BrowserRouter>
    </>
  );
}

export default App;
