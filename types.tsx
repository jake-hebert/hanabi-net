//put exports here
export interface GameCard {
  id: number;
  num: number;
  color: string;
  selected: boolean;
  handPosition?: number; //order in hand
  flip?: boolean;
}

export interface Player {
  // id: string;
  position: number;
  hand: GameCard[];
  name: string | undefined;
}

export interface Game {
  _id?: string | null;
  status: string; //"complete" | "active"
  requiredPlayers: number;
  activePlayers: number;
  playerIndex: { [id: string]: number } | undefined;
  playerList: Player[];
  drawPile: GameCard[];
  discardPile: GameCard[];
  bombs: number;
  hints: number;
  turn: number;
  redPile: number;
  bluePile: number;
  yellowPile: number;
  whitePile: number;
  greenPile: number;
  priorTurn: string;
  lastRound: number;
  score: number;
  chatLink: string;
}

export interface BrowserCookies {
  [key: string]: string | undefined;
}

// export interface Move {
//   id: string;
//   gameId: string;
// }
