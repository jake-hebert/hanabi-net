import React from "react";
import { Game, GameCard } from "../types";

interface CardProps {
  card: GameCard;
  updateCard?(card: GameCard): void;
  hideValues: boolean;
}

export default class Card extends React.Component<CardProps, any> {
  render() {
    const cardColor = () => {
      if (this.props.hideValues === true) {
        return "grey";
      }
      if (this.props.card.color == "Blue") {
        return "light-blue";
      } else {
        return this.props.card.color;
      }
    };

    const selectCard = (e: any) => {
      if (this.props.updateCard) {
        let card = this.props.card;
        card.selected = !card.selected;
        this.props.updateCard(card);
      }
    };
    return (
      <div
        style={{
          display: "inline-block",
          height: "60px",
          width: "40px",
          border: this.props.card.selected
            ? "4px solid blue"
            : "1px solid black",
          padding: "1px",
          margin: "2px",
          backgroundColor: cardColor(),
          fontWeight: "bold",
          fontSize: "24px"
        }}
        onClick={selectCard}
      >
        {this.props.hideValues ? "*" : this.props.card.num}
      </div>
    );
  }
}
