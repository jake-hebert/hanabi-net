import { GameCard, Player, Game } from "./types";
import { loadGetInitialProps } from "next/dist/next-server/lib/utils";

const numberCountMap: { [key: number]: number } = {
  1: 3,
  2: 2,
  3: 2,
  4: 2,
  5: 1,
};

// init game
export const initGame = (totalPlayers: number): Game => {
  let game: Game = {
    _id: null,
    status: "active",
    requiredPlayers: totalPlayers,
    activePlayers: 0,
    playerList: [],
    playerIndex: undefined,
    drawPile: initDeck(),
    discardPile: [],
    bombs: 0,
    hints: 8,
    turn: 0,
    redPile: 0,
    bluePile: 0,
    yellowPile: 0,
    whitePile: 0,
    greenPile: 0,
    priorTurn: "",
    lastRound: -1,
    score: 0,
    chatLink: "",
  };
  initAllPlayers(game);
  return game;
};

export const blankGame = (): Game => {
  let game: Game = {
    _id: null,
    status: "active",
    requiredPlayers: 0,
    activePlayers: 0,
    playerList: [],
    playerIndex: undefined,
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
    priorTurn: "",
    lastRound: -1,
    score: 0,
    chatLink: "",
  };
  return game;
};

// this method mutates the game that is passed in
const initAllPlayers = (game: Game) => {
  for (let i = 0; i < game.requiredPlayers; i++) {
    let player: Player = initPlayer(i);
    dealHand(player, game);
    game.playerList.push(player);
  }
};

// init player
export const initPlayer = (playerPosition: number): Player => {
  return {
    // id: ,
    position: playerPosition,
    hand: [],
    name: undefined,
  };
};

// deal a hand - mutates player & game!
export const dealHand = (player: Player, game: Game) => {
  const n = game.requiredPlayers < 4 ? 5 : 4; // less than 4 players, 5 cards each. 4 or more, 4 cards
  //let player = initPlayer(position, "player");
  for (let i = 0; i < n; i++) {
    const card = game.drawPile.pop() as GameCard;
    player.hand.push(card);
  }
};

// buildDeck
const initDeck = (): GameCard[] => {
  let colorList = [...colors];
  let deck: GameCard[] = [];
  let idCounter: number = 0;
  colorList.forEach((color) => {
    for (let i = 1; i < 6; i++) {
      const numCount = numberCountMap[i];
      for (let j = 0; j < numCount; j++) {
        idCounter++;
        let card: GameCard = {
          id: idCounter,
          num: i,
          color: color,
          selected: false,
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
