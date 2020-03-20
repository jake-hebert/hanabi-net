import React from "react";
import { Game } from "../types";
import Link from "next/link";
interface GameDetailProps {
  game: Game;
}

export default class NewGameForm extends React.Component<GameDetailProps, any> {
  joinGame = () => {
    if (this.props.game.status === "new") {
      return (
        <Link href={"/game/" + this.props.game._id}>
          <button> Join Game </button>
        </Link>
      );
    }
  };

  joinBtn = this.joinGame();

  render() {
    return (
      <div>
        <p>
          Game {this.props.game._id}
          <br /> Status: {this.props.game.status}
          <br /> Players: {this.props.game.activePlayers} /{" "}
          {this.props.game.requiredPlayers}
          <br />
          {this.joinBtn}
        </p>
        {}
      </div>
    );
  }
}
