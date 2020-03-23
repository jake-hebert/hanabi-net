import React from "react";
import fetch from "isomorphic-unfetch";
import { Game, Player } from "../types";
import { blankGame, dealHand } from "../gameFunctions";
import Hand from "./hand";

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

  updateGame = (game: Game) => {
    // make database update
    // here
    //

    this.setState({ game });
  };

  handleHint = (hint: string, player: Player) => {
    let gameUpdate: Game = { ...this.state.game };
    gameUpdate.lastHint = hint;
    gameUpdate.playerList.filter(p => {
      p.position === player.position;
    })[0].hand = { ...player.hand };
    this.updateGame(gameUpdate);
  };

  hands = (game: Game): JSX.Element[] => {
    let hands: JSX.Element[] = [];
    game.playerList.forEach(player => {
      hands.push(<Hand player={player} giveHint={this.handleHint} />);
    });
    return hands;
  };

  playerHand = (): JSX.Element[] => {
    const playerNumber = this.state.playerNumber - 1;
    if (this.state.game.playerList[playerNumber]) {
      const hand = this.state.game.playerList[playerNumber].hand;
      return this.hands(this.state.game);
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
