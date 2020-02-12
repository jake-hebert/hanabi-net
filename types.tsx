//put exports here
export interface GameCard {
  num: number;
  color: string; // validation of color gets weird
  handPosition?: number; //order in hand
  flip?: boolean;
}

export interface Player {
  position: number;
  hand: GameCard[];
  name: string;
}

export interface Game {
  _id: string | null;
  status: string; //"won" | "lost" | "new" | "active"
  requiredPlayers: number;
  activePlayers: number;
  playerList: Player[];
  drawPile: GameCard[];
  bombs: number;
  hints: number;
  turn: number;
  redPile: number;
  bluePile: number;
  yellowPile: number;
  whitePile: number;
  greenPile: number;
}

export interface Move {
  id: string;
  gameId: string;
}
