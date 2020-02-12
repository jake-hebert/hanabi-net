import { GameCard, Player, Game } from "./types";
// init game
export const initGame = (totalPlayers: number): Game => {
  let game: Game = {
    id: "hg0001",
    status: "new",
    requiredPlayers: totalPlayers,
    activePlayers: 1,
    playerList: [],
    drawPile: initDeck(),
    bombs: 0,
    hints: 8,
    turn: 1,
    redPile: 0,
    bluePile: 0,
    yellowPile: 0,
    whitePile: 0,
    greenPile: 0
  };
  return game;
};

// init player
export const initPlayer = (playerPosition: number, name: string): Player => {
  return {
    position: playerPosition,
    hand: [],
    name: name
  };
};

// buildDeck
const initDeck = (): GameCard[] => {
  let colorList = [...colors];
  let deck: GameCard[] = [];
  colorList.forEach(color => {
    for (let i = 1; i < 6; i++) {
      let card: GameCard = {
        num: i,
        color: color
      };
      deck.push(card);
    }
  });
  //shuffle the deck // stolen from stackexchange!
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

// card colors
export const colors: string[] = ["red", "blue", "yellow", "white", "green"];
