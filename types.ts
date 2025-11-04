
export interface Answer {
  text: string;
  points: number;
  revealed: boolean;
}

export interface RoundData {
  question: string;
  answers: Answer[];
}

export enum GameStatus {
  Start,
  Loading,
  Playing,
  StealAttempt,
  RoundOver,
  GameOver,
}
