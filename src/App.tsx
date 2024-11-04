import React, { useState } from 'react';
import { TestTube2, Sun, Moon, Download, Printer, Menu } from 'lucide-react';
import PeptideForm from './components/PeptideForm';
import ResultsTable from './components/ResultsTable';
import { Prediction } from './types';

function App() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [darkMode, setDarkMode] = useState(true);

  const handleSubmit = async (peptides: string[], hla: string) => {
    // Simulate API call with mock predictions
    const mockPredictions: Prediction[] = peptides.map(peptide => ({
      id: Math.random().toString(),
      hla: hla,
      mhc: 'YFAMYQENMAHTDANTLYIIRDYTWVARVYRGY',
      peptide: peptide,
      prediction: Math.random() > 0.5 ? 1 : 0,
      score: Math.random()
    }));
    setPredictions(mockPredictions);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <header className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TestTube2 className="h-6 w-6" />
              <h1 className="text-xl font-bold">p-MHC Binding Prediction</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="#" className="hover:text-blue-400">INGRESO DE INFORMACIÓN</a>
              <a href="#" className="hover:text-blue-400">¿CÓMO SE USA?</a>
              <a href="#" className="hover:text-blue-400">SALIDA</a>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-700"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Menu className="h-5 w-5 cursor-pointer" />
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              SUBMISSION <TestTube2 className="ml-2 h-5 w-5" />
            </h2>
            <PeptideForm onSubmit={handleSubmit} />
          </div>

          {predictions.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Predictions</h2>
                <div className="flex space-x-4">
                  <button className="p-2 hover:bg-gray-700 rounded">
                    <Download className="h-5 w-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-700 rounded">
                    <Printer className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <ResultsTable predictions={predictions} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;