import React from "react";
import { Game, GameCard } from "../types";
import { stringify } from "querystring";

interface CardProps {
  card: GameCard;
  updateCard?(card: GameCard): void;
  hideValues: boolean;
}

interface CardState {
  transform: number;
}

export default class Card extends React.Component<CardProps, CardState> {
  render() {
    const cardColor = () => {
      if (this.props.hideValues === true) {
        return "grey";
      }
      if (this.props.card.color == "blue") {
        return "aqua";
      }
      if (this.props.card.color == "green") {
        return "LawnGreen";
      } else {
        return this.props.card.color;
      }
    };

    const getImgSrc = () => {
      if (this.props.hideValues === true) {
        return 'URL("/HanabiCardBack.png")';
      }
      return "";
    };

    const getTransform = () => {
      return "rotate(0deg)";
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
          width: "60px",
          height: "90px",
          display: "inline-block",
          padding: "5px",
        }}
      >
        <div
          style={{
            height: "90px",
            width: "60px",
            border: this.props.card.selected
              ? "4px solid blue"
              : "2px solid gray",
            borderRadius: "10%",
            //padding: "3px",
            margin: "2px",
            backgroundImage: getImgSrc(),
            backgroundColor: cardColor(),
            backgroundSize: "60px 90px",
            backgroundRepeat: "no-repeat",
            fontWeight: "bold",
            fontSize: "24px",
            fontFamily: "sans-serif",
            transform: getTransform(),
          }}
          onClick={selectCard}
        >
          &nbsp;
          {this.props.hideValues ? "" : this.props.card.num.toString()}
        </div>
      </div>
    );
  }
}
