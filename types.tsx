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
  position: number; // remove this once we have a player index
  hand: GameCard[];
  //name: string;
}

export interface Game {
  _id: string | null;
  status: string; //"won" | "lost" | "new" | "active"
  requiredPlayers: number;
  activePlayers: number;
  //playerIndex: {[position : number] : Player}; // use this
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
  lastHint: string;
}

// export interface Move {
//   id: string;
//   gameId: string;
// }
