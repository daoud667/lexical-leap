import NenoAkili from './components/NenoAkili';
import { Toaster } from 'sonner';

function App() {
  return (
    <main
      className='flex items-center justify-center min-h-screen bg-gray-100 p-4'
      style={{
        backgroundImage: `url('https://storage.googleapis.com/dala-prod-public-storage/generated-images/01c007be-67a2-4709-a74e-db53930877fa/african-pattern-background-ldt04vo-1762468471376.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Toaster richColors position='top-center' />
      <NenoAkili />
    </main>
  );
}

export default App;
