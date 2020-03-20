import React from "react";
import { Player } from "../types";
import Card from "./card";

interface HandProps {
  player: Player;
  updatePlayer(player: Player): void;
}

// interface GameCmpState {
// }
const updateCard = () => {};

export default class Hand extends React.Component<HandProps, any> {
  buildHand = (player: Player): JSX.Element[] => {
    const hand = player.hand;
    return hand.map(card => <Card card={card} updateCard={updateCard} />);
  };

  render() {
    return (
      <div style={{ border: "1px solid black" }}>
        <br />
        {this.buildHand(this.props.player)}
      </div>
    );
  }
}
