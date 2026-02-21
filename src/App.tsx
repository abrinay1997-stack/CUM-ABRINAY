import { useState } from 'react';
import Hero from './components/Hero';
import Description from './components/Description';
import RegistrationForm from './components/RegistrationForm';
import GuestList from './components/GuestList';
import Footer from './components/Footer';

function App() {
  const [guests, setGuests] = useState<string[]>([
    "Carlos M.", "Sofia R.", "Javier T.", "Elena P.", "Marco D.", 
    "Valentina S.", "Andres L.", "Isabella G.", "Ricardo F.", "Camila B."
  ]);

  const handleNewGuest = (name: string) => {
    setGuests(prev => [name, ...prev]);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <main>
        <Hero />
        <Description />
        <RegistrationForm onNewGuest={handleNewGuest} />
        <GuestList guests={guests} />
        <Footer />
      </main>
    </div>
  );
}

export default App;
