import { BrowserRouter } from 'react-router-dom';
import './assets/styles/tailwind.css';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Router from './router/router';
import Contents from './components/layouts/Contents';
import GlobalStyle from './assets/styles/GlobalStyle';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebaseConfig';

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loading setLoading] = useState(true);

  useEffect (() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user as User | null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <section>
          <Header  user={user}/>
          <Contents>
            <Router />
          </Contents>
          <Footer />
        </section>
      </BrowserRouter>
    </>
  );
}

export default App;
