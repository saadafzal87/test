import type { FC } from 'react';
import { Footer } from './components/layout/Footer/Footer';
import { Hero } from './features/Hero/Hero';
import { Navbar } from './components/layout/Navbar/Navbar';

const App: FC = () => (
  <>
    <Navbar />
    <main id="main-content">
      <Hero />
    </main>
    <Footer />
  </>
);

export default App;
