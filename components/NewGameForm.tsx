import React from "react";
import { initGame } from "../gameFunctions";
import fetch from "isomorphic-unfetch";
import Router from "next/router";

interface NewGameState {
  numberOfPlayers: number;
  chatLink: string;
}

export default class NewGameForm extends React.Component<any, NewGameState> {
  constructor(props: any) {
    super(props);
    this.state = {
      numberOfPlayers: 3,
      chatLink: "",
    };
  }

  handlePlayers = (event: React.ChangeEvent<HTMLInputElement>) => {
    let n = parseInt(event.target.value, 10);
    this.setState({ numberOfPlayers: n });
  };

  handleChat = (event: React.ChangeEvent<HTMLInputElement>) => {
    let chatLink = event.target.value;
    this.setState({ chatLink });
  };

  handleSubmit = async (event: any) => {
    const game = initGame(this.state.numberOfPlayers);
    game.chatLink = this.state.chatLink;
    const baseUri =
      process.env.NODE_ENV === "development"
        ? process.env.DEV_URI
        : process.env.PROD_URI;
    const res = await fetch(baseUri + "/api/games", {
      method: "post",
      body: JSON.stringify(game),
    });
    Router.push("/index");
  };

  render() {
    return (
      <div>
        <label>Players:</label>
        <br />
        <input
          type="number"
          min="2"
          max="5"
          value={this.state.numberOfPlayers}
          onChange={this.handlePlayers}
        />
        <br />
        <br />
        Link to a zoom/hangout/discord
        <br />
        <input
          type="text"
          value={this.state.chatLink}
          onChange={this.handleChat}
        />
        <br />
        <button onClick={this.handleSubmit}> Create game </button>
      </div>
    );
  }
}
