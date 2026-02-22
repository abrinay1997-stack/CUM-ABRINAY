import Hero from './components/Hero';
import Description from './components/Description';
import RegistrationForm from './components/RegistrationForm';
import ConfirmedCounter from './components/ConfirmedCounter';
import StickyCtaButton from './components/StickyCtaButton';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main>
        <Hero />
        <RegistrationForm />
        <Description />
        <ConfirmedCounter />
      </main>
      <StickyCtaButton />
    </div>
  );
}

export default App;
