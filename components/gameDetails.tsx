import React from "react";
import { Game } from "../types";
import Link from "next/link";
interface GameDetailProps {
  game: Game;
  playerId: string | undefined;
}

export default class NewGameForm extends React.Component<GameDetailProps, any> {
  joinGame = () => {
    if (
      this.props.game.status != "complete" &&
      (this.props.game.activePlayers < this.props.game.requiredPlayers ||
        (this.props.game.playerIndex &&
          this.props.playerId !== undefined &&
          this.props.game.playerIndex[this.props.playerId] !== undefined))
    ) {
      return (
        <Link href={"/game/" + this.props.game._id}>
          <button>Join</button>
        </Link>
      );
    }
  };

  joinBtn = this.joinGame();

  render() {
    const chatStr = () => {
      if (!this.props.game.chatLink) {
        return "";
      }
      if (this.props.game.chatLink.length < 50) {
        return this.props.game.chatLink;
      }
      return this.props.game.chatLink.substring(0, 50) + "...";
    };

    return (
      <div
        style={{
          backgroundColor: "lightgray",
          width: "600px",
          border: "3px solid gray",
          margin: "3px",
          padding: "10px",
        }}
      >
        Game {this.props.game._id}
        <br /> Status: {this.props.game.status}
        <br /> Players: {this.props.game.activePlayers} /{" "}
        {this.props.game.requiredPlayers}
        <br />
        Chat Link:{" "}
        <a href={this.props.game.chatLink} target="_blank">
          {chatStr()}
        </a>
        <br />
        {this.joinBtn}
      </div>
    );
  }
}
