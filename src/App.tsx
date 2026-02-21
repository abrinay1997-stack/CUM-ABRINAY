import Hero from './components/Hero';
import Description from './components/Description';
import RegistrationForm from './components/RegistrationForm';
import GuestList from './components/GuestList';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main>
        <Hero />
        <Description />
        <RegistrationForm />
        <GuestList />
        <Footer />
      </main>
    </div>
  );
}

export default App;
