import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface PeptideFormProps {
  onSubmit: (peptides: string[], hla: string) => void;
}

const HLA_OPTIONS = [
  'HLA-A*01:01',
  'HLA-A*02:01',
  'HLA-B*07:02',
  'HLA-B*08:01',
];

const PeptideForm: React.FC<PeptideFormProps> = ({ onSubmit }) => {
  const [inputType, setInputType] = useState<'peptide' | 'fasta'>('peptide');
  const [sequences, setSequences] = useState('');
  const [selectedHLA, setSelectedHLA] = useState(HLA_OPTIONS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const peptides = sequences
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    onSubmit(peptides, selectedHLA);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Input type
        </label>
        <select
          value={inputType}
          onChange={(e) => setInputType(e.target.value as 'peptide' | 'fasta')}
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="peptide">Peptide</option>
          <option value="fasta">Fasta</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Paste sequences in {inputType} format
        </label>
        <textarea
          value={sequences}
          onChange={(e) => setSequences(e.target.value)}
          className="w-full h-32 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
          placeholder={inputType === 'peptide' ? 'Enter peptide sequences' : '>seq1\nPeptideSequence'}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Select HLA alleles *
        </label>
        <select
          value={selectedHLA}
          onChange={(e) => setSelectedHLA(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
        >
          {HLA_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-sm text-gray-400 mb-2">Or upload a file</p>
        <div className="flex space-x-4">
          <button
            type="button"
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm"
          >
            <Upload className="h-4 w-4" />
            <span>FILE TXT</span>
          </button>
          <button
            type="button"
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm"
          >
            <Upload className="h-4 w-4" />
            <span>FILE CSV</span>
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
      >
        SUBMIT
      </button>
    </form>
  );
};

export default PeptideForm;