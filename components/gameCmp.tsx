import React from "react";
import fetch from "isomorphic-unfetch";
import { Game } from "../types";
import { blankGame, dealHand } from "../gameFunctions";

interface GameCmpProps {
  gameId: string;
}

interface GameCmpState {
  game: Game;
  playerNumber: number;
}

const getGame = async (gameId: string) => {
  //query for game based on id
  const baseUri =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://hanabi-net.herokuapp.com";
  const res = await fetch(baseUri + "/api/games?id=" + gameId, {
    method: "get"
  });

  const game: Game = await res.json();
  return game;
};

const getPlayerNumber = (game: Game) => {
  if (game.activePlayers < game.requiredPlayers) {
    return (game.activePlayers += 1);
  } else {
    return -1;
  }
};

const updateGame = (game: Game) => {
  // update the game!
};

export default class GameCmp extends React.Component<
  GameCmpProps,
  GameCmpState
> {
  constructor(props: GameCmpProps) {
    super(props);
    this.state = {
      game: blankGame(),
      playerNumber: 0
    };
  }
  async componentDidMount() {
    if (this.props.gameId !== null) {
      let game = await getGame(this.props.gameId);
      const playerNumber = getPlayerNumber(game);
      console.log(playerNumber);
      if (playerNumber > 0) {
        game = dealHand(game, playerNumber);
      }
      this.setState({
        game,
        playerNumber
      });
      console.log(game);
    }
  }

  playerHand = (): JSX.Element[] => {
    const playerNumber = this.state.playerNumber - 1;
    if (this.state.game.playerList[playerNumber]) {
      const hand = this.state.game.playerList[playerNumber].hand;
      return hand.map(card => (
        <div
          style={{
            display: "inline-block",
            height: "60px",
            width: "40px",
            border: "1px solid black",
            padding: "1px",
            margin: "2px"
          }}
        >
          {card.color}
          <br />
          {card.num}
        </div>
      ));
    } else {
      return [<div>loading</div>];
    }
  };

  render() {
    return (
      <div>
        <div>
          Your hand: <br />
          {this.playerHand()}
        </div>
        <div>other hands here</div>
      </div>
    );
  }
}
