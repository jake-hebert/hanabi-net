import React from "react";
import { initGame } from "../gameFunctions";
import fetch from "isomorphic-unfetch";

interface NewGameState {
  numberOfPlayers: number;
}

export default class NewGameForm extends React.Component<any, NewGameState> {
  constructor(props: any) {
    super(props);
    this.state = {
      numberOfPlayers: 3
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let n = parseInt(event.target.value, 10);
    this.setState({ numberOfPlayers: n });
  };

  handleSubmit = async (event: any) => {
    console.log("new game submitted");
    const game = initGame(this.state.numberOfPlayers);
    console.log(game);
    const baseUri =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://hanabi-net.herokuapp.com";
    const res = await fetch(baseUri + "/api/games", {
      method: "post",
      body: JSON.stringify(game)
    });

    console.log(res);
  };

  render() {
    return (
      <div>
        <label>Players:</label>
        <input
          type="number"
          min="3"
          max="5"
          value={this.state.numberOfPlayers}
          onChange={this.handleChange}
        />
        <p>
          <button onClick={this.handleSubmit}> Create game </button>
        </p>
      </div>
    );
  }
}
