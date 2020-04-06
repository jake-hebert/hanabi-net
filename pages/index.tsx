import Link from "next/link";
import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";
import { Game, BrowserCookies } from "../types";
import GameDetails from "../components/gameDetails";
import cookies from "next-cookies";
import Cookies from "universal-cookie";

import { randomString } from "../utilityFunctions";
import { useState } from "react";

interface IndexProps {
  data: any;
  allCookies: BrowserCookies;
  playerName: string | undefined;
  displayNameInput: boolean;
}

const Index = (props: IndexProps) => {
  const [playerName, setPlayerName] = useState(props.playerName);
  const [displayNameInput, setDisplayNameInput] = useState(
    props.displayNameInput
  );
  if (!props.allCookies.userId) {
    const cookies = new Cookies();
    cookies.set("userId", randomString(), {
      path: "/",
      expires: new Date(Date.now() + 600000000),
    });
  }
  const getGames = () => {
    let values = props.data;
    let games: Game[] = [];
    for (let i = 0; i < values.length; i++) {
      games.push(values[i] as Game);
    }
    return games;
  };

  const gameList = (playerId: string) => {
    return getGames().map((g) => (
      <GameDetails game={g} key={g._id as string} playerId={playerId} />
    ));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  const nameInput = (): JSX.Element => {
    console.log("hitting a function...");
    return (
      <div>
        <label>Player Name:</label>
        <input type="text" value={playerName} onChange={handleNameChange} />
        <button onClick={updateName}>Save name</button>
      </div>
    );
  };

  const nameDisplay = (): JSX.Element => {
    console.log("hitting a display function...");
    return (
      <div>
        <label>Player Name: </label>
        <span style={{ fontStyle: "italic" }}>
          {playerName ? playerName : " set your name -> "}
        </span>
        <button onClick={toggleNameUpdate}> Change Name</button>
      </div>
    );
  };

  const toggleNameUpdate = (event: any) => {
    console.log("triggering re-render?");
    setDisplayNameInput(true);
  };

  const updateName = (event: any) => {
    const cookies = new Cookies();
    cookies.set("playerName", playerName, {
      path: "/",
      expires: new Date(Date.now() + 600000000),
    });
    setDisplayNameInput(false);
  };

  return (
    <Layout>
      <div>
        <p>
          <span className="title">Welcome to Hanabi-Net!</span>
          <br />A place for playing Hanabi online
        </p>
        <br />
        {displayNameInput ? nameInput() : nameDisplay()}
      </div>
      <div>
        <Link href="/newGamePage">
          <button title="new game"> Start a new game </button>
        </Link>
      </div>
      <br />
      <div>{gameList(props.allCookies["userId"] as string)}</div>
    </Layout>
  );
};

Index.getInitialProps = async (ctx: any) => {
  const baseUri =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://hanabi-net.herokuapp.com";
  const res = await fetch(baseUri + "/api/games", {
    method: "get",
  });
  const data = await res.json();
  let allCookies = cookies(ctx);
  let playerName = allCookies.playerName;
  return { data, allCookies, playerName, displayNameUpdate: false };
};

export default Index;
