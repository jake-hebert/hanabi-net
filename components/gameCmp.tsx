import React from "react";
import fetch from "isomorphic-unfetch";
import { Game, Player } from "../types";
import { blankGame, dealHand } from "../gameFunctions";
import Hand from "./hand";
import Card from "./card";

interface GameCmpProps {
  gameId: string;
}

interface GameCmpState {
  game: Game;
  playerNumber: number;
  turnType: string;
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
    let playerNum = game.activePlayers;
    return game.activePlayers;
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
      playerNumber: 0,
      turnType: ""
    };
  }

  async componentDidMount() {
    if (this.props.gameId !== null) {
      let game = await getGame(this.props.gameId);
      const playerNumber = getPlayerNumber(game);
      console.log(playerNumber);
      this.setState({
        game,
        playerNumber
      });
      console.log(game);
    }
  }

  updateGame = (game: Game) => {
    this.setState({ game });
  };

  turnSelect = (turnType: string) => {
    console.log("Chose " + turnType);
    let game = this.deselectCards();
    this.setState({ game, turnType });
  };

  turnSelectPlay = () => {
    this.turnSelect("play");
  };

  turnSelectDiscard = () => {
    this.turnSelect("discard");
  };

  turnSelectHint = () => {
    this.turnSelect("hint");
  };

  submitGame = () => {
    // increment turn
    // submit database update,
  };

  deselectCards = (): Game => {
    let game: Game = JSON.parse(JSON.stringify(this.state.game));
    for (let i = 0; i < game.playerList.length; i++) {
      let player = game.playerList[i];
      for (let j = 0; j < player.hand.length; j++) {
        player.hand[j].selected = false;
      }
    }
    return game;
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
      hands.push(
        <Hand
          game={this.state.game}
          player={player}
          giveHint={this.handleHint}
          hideValues={player.position == this.state.playerNumber}
          updateGame={this.updateGame}
        />
      );
    });
    return hands;
  };

  displayHands = (): JSX.Element[] => {
    const playerNumber = this.state.playerNumber;
    if (this.state.game.playerList[playerNumber]) {
      return this.hands(this.state.game);
    } else {
      return [<div>loading</div>];
    }
  };

  displayDiscards = (): JSX.Element[] => {
    const playerNumber = this.state.playerNumber;
    if (this.state.game.discardPile) {
      return this.discardPile();
    } else {
      return [<div>loading</div>];
    }
  };

  discardPile = (): JSX.Element[] => {
    return this.state.game.discardPile.map(card => (
      <Card card={card} hideValues={false} />
    ));
  };

  displayTurn = (): JSX.Element => {
    if (this.state.game.turn === this.state.playerNumber) {
      return (
        <div>
          It's your turn!
          <p>
            <button onClick={this.turnSelectPlay}>play card</button>
            <button onClick={this.turnSelectDiscard}>discard card</button>
            <button onClick={this.turnSelectHint}>give hint</button>
          </p>
        </div>
      );
    } else {
      return <div>Player {this.state.playerNumber + 1}'s turn</div>;
    }
  };

  render() {
    return (
      <div style={{ height: "550px", display: "flex" }}>
        <div
          style={{
            margin: "auto",
            width: "50%",
            border: "1px solid black",
            height: "100%"
          }}
        >
          {this.displayTurn()}
          <div>
            <br />
            {this.displayHands()}
          </div>
        </div>
        <div
          style={{
            border: "1px solid black",
            width: "50%",
            height: "100%"
          }}
        >
          <div>
            <br />
            Last Hint: {" " + this.state.game.lastHint}
            <br />
            Available Hints: {" " + this.state.game.hints}
            <br />
            Bombs exploded: {" " + this.state.game.bombs}
            <br />
            Cards in draw pile: {" " + this.state.game.drawPile.length}
            <br />
          </div>
          <div>{this.displayDiscards}</div>
        </div>
      </div>
    );
  }
}
