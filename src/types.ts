export interface Prediction {
  id: string;
  hla: string;
  mhc: string;
  peptide: string;
  prediction: number;
  score: number;
}