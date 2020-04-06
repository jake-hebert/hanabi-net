import React from "react";
import fetch from "isomorphic-unfetch";
import { Game, Player, GameCard, BrowserCookies } from "../types";
import { blankGame, dealHand } from "../gameFunctions";
import Hand from "./hand";
import Card from "./card";
import { randomString } from "../utilityFunctions";

interface GameCmpProps {
  gameId: string;
  playerNumber?: number; // if we need to pass in the player number - optional
  cookies: BrowserCookies;
}

interface GameCmpState {
  game: Game;
  playerNumber: number;
  turnType: string;
  error: string;
  hintText: string;
  //playerName: string;
}

const getGame = async (gameId: string) => {
  //query for game based on id
  const baseUri =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://hanabi-net.herokuapp.com";
  const res = await fetch(baseUri + "/api/games?id=" + gameId, {
    method: "get",
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
    body: JSON.stringify(game),
  });
};

const getPlayerNumber = (game: Game, cookies: BrowserCookies): number => {
  if (cookies != undefined) {
    const playerId = cookies.userId as string;
    if (game.playerIndex && game.playerIndex[playerId] !== undefined) {
      return game.playerIndex[playerId];
    }
  }
  if (game.activePlayers < game.requiredPlayers) {
    let playerNum = game.activePlayers;
    game.activePlayers++;
    if (cookies) {
      const playerName = cookies.playerName;
      game.playerList[playerNum].name = playerName;
      if (game.playerIndex === undefined) {
        game.playerIndex = {
          [cookies.userId as string]: playerNum,
        };
      } else {
        game.playerIndex[cookies.userId as string] = playerNum;
      }
      submitGame(game);
      return playerNum;
    }
  }
  return -1;
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
      hintText: "",
      //playerName: props.cookies.name as string
    };
  }

  async componentDidMount() {
    if (this.props.gameId !== null) {
      let game = await getGame(this.props.gameId);
      let playerNumber = -1;
      if (this.props.playerNumber !== undefined) {
        playerNumber = this.props.playerNumber;
      } else {
        playerNumber = getPlayerNumber(game, this.props.cookies);
      }
      this.setState({
        game,
        playerNumber,
      });
      setInterval(this.intervalRefresh, 7000);
    }
  }
  intervalRefresh = async () => {
    if (this.state.game.turn != this.state.playerNumber) {
      await this.refresh();
    }
  };
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

  handlePlay = (game: Game) => {
    let error: string = "";
    const selectedCards = game.playerList[this.state.playerNumber].hand.filter(
      (card) => card.selected
    );
    // throw an error if more than one card is selected
    if (selectedCards.length != 1) {
      this.setState({ error: "Please select one card to play" });
      return false;
    }
    if (error !== "") {
      this.setState({ error });
    } else {
      const cardIndex = game.playerList[this.state.playerNumber].hand.findIndex(
        (c) => c.selected
      );
      let playCard = game.playerList[this.state.playerNumber].hand[cardIndex];
      game.playerList[this.state.playerNumber].hand.splice(cardIndex, 1);
      let validMove: boolean = false;
      switch (playCard.color) {
        case "red":
          if (game.redPile + 1 === playCard.num) {
            game.redPile++;
            validMove = true;
          }
          break;
        case "blue":
          if (game.bluePile + 1 === playCard.num) {
            game.bluePile++;
            validMove = true;
          }
          break;
        case "yellow":
          if (game.yellowPile + 1 === playCard.num) {
            game.yellowPile++;
            validMove = true;
          }
          break;
        case "white":
          if (game.whitePile + 1 === playCard.num) {
            game.whitePile++;
            validMove = true;
          }
          break;
        case "green":
          if (game.greenPile + 1 === playCard.num) {
            game.greenPile++;
            validMove = true;
          }
      }
      if (!validMove) {
        game.bombs++;
        playCard.selected = false;
        game.discardPile.push(playCard);
      }
      if (validMove && playCard.num === 5 && game.hints < 8) {
        game.hints++;
      }
      if (game.drawPile.length > 0) {
        let drawCard: GameCard = game.drawPile.pop() as GameCard;
        game.playerList[this.state.playerNumber].hand.push(drawCard);
      }
      game.priorTurn =
        "Player " +
        (this.state.playerNumber + 1) +
        " played " +
        playCard.color +
        " " +
        playCard.num;
      this.takeTurn(game);
      this.checkEndGame(game);
      this.setState({ game, error: "", turnType: "" });
      submitGame(game);
    }

    return true;
  };

  handleDiscard = (game: Game) => {
    let error: string = "";
    const selectedCards = this.state.game.playerList[
      this.state.playerNumber
    ].hand.filter((card) => card.selected);
    // throw an error if more than one card is selected
    if (selectedCards.length != 1) {
      error = "Please select one card to discard";
    }
    if (error !== "") {
      this.setState({ error });
    } else {
      let discardCard: GameCard;
      const cardIndex = game.playerList[this.state.playerNumber].hand.findIndex(
        (c) => c.selected
      );
      discardCard = {
        ...game.playerList[this.state.playerNumber].hand[cardIndex],
      };
      game.playerList[this.state.playerNumber].hand.splice(cardIndex, 1);
      discardCard.selected = false;
      game.discardPile.push(discardCard);
      if (game.drawPile.length > 0) {
        const drawCard = game.drawPile.pop() as GameCard;
        game.playerList[this.state.playerNumber].hand.push(drawCard);
      }
      if (game.hints < 8) {
        game.hints++;
      }
      game.priorTurn =
        "Player " +
        (this.state.playerNumber + 1) +
        " discarded " +
        discardCard.color +
        " " +
        discardCard.num;
      this.takeTurn(game);
      this.checkEndGame(game);
      this.setState({ game, error: "", turnType: "" });
      submitGame(game);
    }
  };

  handleHint = (game: Game) => {
    const players: Player[] = game.playerList;
    let selectedPlayers: Player[] = [];
    let error: string = "";
    for (let i = 0; i < players.length; i++) {
      const player: Player = players[i];
      const selectedHand = player.hand.filter((c) => c.selected);
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
      game.priorTurn =
        "Player " +
        (this.state.playerNumber + 1) +
        " gave hint: " +
        this.state.hintText;
      game.hints--;
      this.takeTurn(game);
      this.checkEndGame(game);
      this.setState({ game, error: "", turnType: "" });
      submitGame(game);
    }
  };

  takeTurn = (game: Game) => {
    // increment turn
    let newTurn = (): number => {
      if (this.state.game.turn < this.state.game.requiredPlayers - 1) {
        return this.state.game.turn + 1;
      } else {
        return 0;
      }
    };
    game.turn = newTurn();
    // start final round if we drew the last card:
    if (game.drawPile.length < 1 && game.lastRound === -1) {
      game.lastRound = 0;
    }
    if (game.lastRound > -1) {
      game.lastRound++;
    }
  };

  checkEndGame = (game: Game) => {
    const score =
      game.bluePile +
      game.redPile +
      game.greenPile +
      game.whitePile +
      game.yellowPile;
    if (score === 25) {
      game.score = score;
      game.status = "complete";
    }
    if (game.bombs === 3) {
      game.score = score;
      game.status = "complete";
    }
    if (game.lastRound > game.requiredPlayers) {
      game.score = score;
      game.status = "complete";
    }
  };
  handleSubmitGame = () => {
    let game: Game = JSON.parse(JSON.stringify(this.state.game));
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
    this.setState({ hintText: "" });
    return game;
  };

  hands = (game: Game): JSX.Element[] => {
    let hands: JSX.Element[] = [];
    game.playerList.forEach((player) => {
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
    if (this.state.game.discardPile) {
      return this.discardPile();
    } else {
      return [<div>loading</div>];
    }
  };

  discardPile = (): JSX.Element[] => {
    return this.state.game.discardPile.map((card) => (
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
    if (
      this.state.game.turn === this.state.playerNumber &&
      this.state.game.status === "active"
    ) {
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
    } else if (this.state.game.status === "active") {
      return <div>Player {this.state.game.turn + 1}'s turn</div>;
    } else {
      return <div>Game complete! Your score is {this.state.game.score}</div>;
    }
  };

  getCardStyle = (color: string): object => {
    return {
      display: "inline-block",
      height: "60px",
      width: "40px",
      border: "1px solid black",
      padding: "1px",
      margin: "2px",
      backgroundColor: color,
      fontWeight: "bold",
      fontSize: "24px",
      borderRadius: "10%",
    };
  };

  displayPlayStacks = (): JSX.Element => {
    return (
      <div>
        <div style={this.getCardStyle("red")}>{this.state.game.redPile}</div>
        <div style={this.getCardStyle("aqua")}>{this.state.game.bluePile}</div>
        <div style={this.getCardStyle("white")}>
          {this.state.game.whitePile}
        </div>
        <div style={this.getCardStyle("yellow")}>
          {this.state.game.yellowPile}
        </div>
        <div style={this.getCardStyle("LawnGreen")}>
          {this.state.game.greenPile}
        </div>
      </div>
    );
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
            height: "100%",
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
            height: "100%",
          }}
        >
          <div>
            <br />
            Prior Turn: {" " + this.state.game.priorTurn}
            <br />
            Available Hints: {" " + this.state.game.hints}
            <br />
            Bombs exploded: {" " + this.state.game.bombs}
            <br />
            Cards in draw pile: {" " + this.state.game.drawPile.length}
            <br />
          </div>
          <div style={{ padding: "5px" }}>
            Play Stacks: <br /> {this.displayPlayStacks()}
          </div>
          <div style={{ padding: "5px" }}>
            Discard: <br /> {this.displayDiscards()}
          </div>
        </div>
      </div>
    );
  }
}
