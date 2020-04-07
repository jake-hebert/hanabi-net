import React from "react";
import { Player, GameCard, Game } from "../types";
import Card from "./card";

interface HandProps {
  game: Game;
  player: Player;
  //name: string;
  hideValues: boolean;
  updateGame(game: Game): void;
}

// interface GameCmpState {}

export default class Hand extends React.Component<HandProps, any> {
  updateCard = (card: GameCard) => {
    let game: Game = JSON.parse(JSON.stringify(this.props.game));
    game.playerList[this.props.player.position].hand.filter((h) => {
      h.id === card.id;
    })[0] = card;
    this.props.updateGame(game);
  };

  buildHand = (player: Player): JSX.Element[] => {
    const hand = player.hand;
    return hand.map((card) => (
      <Card
        card={card}
        updateCard={this.updateCard}
        hideValues={this.props.hideValues}
      />
    ));
  };

  render() {
    return (
      <div>
        Player {this.props.player.position + 1}{" "}
        {this.props.player.name ? this.props.player.name : ""}
        <br />
        {this.buildHand(this.props.player)}
      </div>
    );
  }
}
