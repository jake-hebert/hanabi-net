import React from "react";
import fetch from "isomorphic-unfetch";
import { Game, Player, GameCard } from "../types";
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
  error: string;
  hintText: string;
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

const submitGame = async (game: Game) => {
  const baseUri =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://hanabi-net.herokuapp.com";
  const res = await fetch(baseUri + "/api/games", {
    method: "post",
    body: JSON.stringify(game)
  });
};

const getPlayerNumber = (game: Game) => {
  if (game.activePlayers < game.requiredPlayers) {
    let playerNum = game.activePlayers;
    game.activePlayers++;
    submitGame(game);
    return playerNum;
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
      turnType: "",
      error: "",
      hintText: ""
    };
  }

  async componentDidMount() {
    if (this.props.gameId !== null) {
      let game = await getGame(this.props.gameId);
      const playerNumber = getPlayerNumber(game);
      this.setState({
        game,
        playerNumber
      });
    }
  }

  refresh = async () => {
    let game = await getGame(this.props.gameId);
    this.setState({ game, error: "", turnType: "" });
  };

  updateGame = (game: Game) => {
    this.setState({ game });
  };

  turnSelect = (turnType: string) => {
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

  handlePlay = (game: Game): boolean => {
    const selectedCards = {
      ...this.state.game.playerList[this.state.playerNumber].hand
    }.filter(card => card.selected);
    // throw an error if more than one card is selected
    if (selectedCards.length != 1) {
      this.setState({ error: "Please select one card to play" });
      return false;
    }

    return true;
  };

  handleDiscard = (game: Game) => {
    const selectedCards = this.state.game.playerList[
      this.state.playerNumber
    ].hand.filter(card => card.selected);
    // throw an error if more than one card is selected
    if (selectedCards.length != 1) {
      this.setState({ error: "Please select one card to discard" });
    }
    let discardCard: GameCard;
    let cardIndex: number = 0;
    for (
      let i = 0;
      i < game.playerList[this.state.playerNumber].hand.length;
      i++
    ) {
      if (game.playerList[this.state.playerNumber].hand[i].selected) {
        cardIndex = i;
        break;
      }
    }
    discardCard = {
      ...game.playerList[this.state.playerNumber].hand[cardIndex]
    };
    game.playerList[this.state.playerNumber].hand.splice(cardIndex, 1);
    game.discardPile.push(discardCard);
    if (game.drawPile.length > 0) {
      const drawCard = game.drawPile.pop() as GameCard;
      game.playerList[this.state.playerNumber].hand.push(drawCard);
    }
    if (game.hints < 8) {
      game.hints++;
    }
    this.setState({ game, error: "", turnType: "" });
    submitGame(game);
  };

  handleHint = (game: Game) => {
    const players: Player[] = game.playerList;
    let selectedPlayers: Player[] = [];
    let error: string = "";
    for (let i = 0; i < players.length; i++) {
      const player: Player = players[i];
      const selectedHand = player.hand.filter(c => c.selected);
      if (selectedHand.length > 0) {
        selectedPlayers.push(player);
      }
    }
    if (selectedPlayers.length > 1) {
      error = "You may only select one player's cards!";
    } else if (selectedPlayers.length < 1) {
      error = "You must select cards to give a hint!";
    } else if (selectedPlayers[0].position === this.state.playerNumber) {
      error = "You can't give a hint to yourself fool!";
    }
    if (this.state.game.hints < 1) {
      error = "Ain't got no hints to give!";
    }
    if (error !== "") {
      this.setState({ error });
    } else {
      game.lastHint = this.state.hintText;
      game.hints--;
      this.setState({ game, error: "", turnType: "" });
      submitGame(game);
    }
  };

  handleSubmitGame = () => {
    console.log("submitting:" + this.state.turnType);
    // increment turn
    let newTurn = (): number => {
      if (this.state.game.turn < this.state.game.requiredPlayers - 1) {
        return this.state.game.turn + 1;
      } else {
        return 0;
      }
    };
    let game: Game = JSON.parse(JSON.stringify(this.state.game));
    game.turn = newTurn();
    if (this.state.turnType == "play") {
      this.handlePlay(game);
    }

    if (this.state.turnType == "discard") {
      this.handleDiscard(game);
    }

    if (this.state.turnType == "hint") {
      this.handleHint(game);
    }
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

  // handleHint = (hint: string, player: Player) => {
  //   let gameUpdate: Game = { ...this.state.game };
  //   gameUpdate.lastHint = hint;
  //   gameUpdate.playerList.filter(p => {
  //     p.position === player.position;
  //   })[0].hand = { ...player.hand };
  //   this.updateGame(gameUpdate);
  // };

  hands = (game: Game): JSX.Element[] => {
    let hands: JSX.Element[] = [];
    game.playerList.forEach(player => {
      hands.push(
        <Hand
          game={this.state.game}
          player={player}
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
  displayError = (): JSX.Element => {
    if (this.state.error !== "") {
      return <p>{this.state.error}</p>;
    } else {
      return <br />;
    }
  };
  displayTurn = (): JSX.Element => {
    if (this.state.game.turn === this.state.playerNumber) {
      if (this.state.turnType === "") {
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
      } else if (this.state.turnType === "hint") {
        return (
          <div>
            <input
              value={this.state.hintText}
              onChange={(e: any) => this.setHint(e)}
            />
            {/*onChange={e => setHint(e.target.value)} />*/}
            <button onClick={this.handleSubmitGame}>give hint</button>
          </div>
        );
      } else {
        return (
          <div>
            <button onClick={this.handleSubmitGame}>
              confirm {this.state.turnType}
            </button>
          </div>
        );
      }
    } else {
      return <div>Player {this.state.game.turn + 1}'s turn</div>;
    }
  };

  setHint = (e: any) => {
    this.setState({ hintText: e.target.value });
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
          <div>
            <button onClick={this.refresh}> refresh game </button>
            {this.displayError()}
          </div>
          <div style={{ height: "75px" }}>{this.displayTurn()}</div>
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
