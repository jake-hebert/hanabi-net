import React from "react";
import { Game, GameCard } from "../types";

interface CardProps {
  card: GameCard;
  updateCard(card: Card): void;
}

export default class Card extends React.Component<CardProps, any> {
  render() {
    return (
      <div
        style={{
          display: "inline-block",
          height: "60px",
          width: "40px",
          border: "1px solid black",
          padding: "1px",
          margin: "2px", 
          backgroundColor: this.props.card.color,
          fontWeight: "bold",
          fontSize: "12px"
        }}
      >
        {this.props.card.num}
      </div>
    );
  }
}
