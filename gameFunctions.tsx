import { GameCard, Player, Game } from "./types";
import { loadGetInitialProps } from "next/dist/next-server/lib/utils";

const numberCountMap: { [key: number]: number } = {
  1: 3,
  2: 2,
  3: 2,
  4: 2,
  5: 1
};

// init game
export const initGame = (totalPlayers: number): Game => {
  let game: Game = {
    _id: null,
    status: "new",
    requiredPlayers: totalPlayers,
    activePlayers: 0,
    playerList: [],
    drawPile: initDeck(),
    discardPile: [],
    bombs: 0,
    hints: 8,
    turn: 1,
    redPile: 0,
    bluePile: 0,
    yellowPile: 0,
    whitePile: 0,
    greenPile: 0,
    lastHint: ""
  };
  return game;
};

export const blankGame = (): Game => {
  let game: Game = {
    _id: null,
    status: "new",
    requiredPlayers: 0,
    activePlayers: 0,
    playerList: [],
    drawPile: [],
    discardPile: [],
    bombs: 0,
    hints: 8,
    turn: 1,
    redPile: 0,
    bluePile: 0,
    yellowPile: 0,
    whitePile: 0,
    greenPile: 0,
    lastHint: ""
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

// deal a hand
export const dealHand = (game: Game, position: number): Game => {
  const n = game.requiredPlayers < 4 ? 5 : 4; // less than 4 players, 5 cards each. 4 or more, 4 cards
  let player = initPlayer(position, "player");
  for (let i = 0; i < n; i++) {
    const card = game.drawPile.pop() as GameCard;
    player.hand.push(card);
  }
  game.playerList.push(player);
  return game;
};

// buildDeck
const initDeck = (): GameCard[] => {
  let colorList = [...colors];
  let deck: GameCard[] = [];
  let idCounter: number = 0;
  colorList.forEach(color => {
    for (let i = 1; i < 6; i++) {
      const numCount = numberCountMap[i];
      for (let j = 0; j < numCount; j++) {
        idCounter++;
        let card: GameCard = {
          id: idCounter,
          num: i,
          color: color,
          selected: false
        };
        deck.push(card);
      }
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
