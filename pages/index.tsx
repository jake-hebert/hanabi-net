import Link from "next/link";
import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";
import { Game, BrowserCookies } from "../types";
import GameDetails from "../components/gameDetails";
import cookies from "next-cookies";
import Cookies from "universal-cookie";

import { randomString } from "../utilityFunctions";

interface IndexProps {
  data: any;
  allCookies: BrowserCookies;
}

const Index = (props: IndexProps) => {
  if (!props.allCookies.userId) {
    const cookies = new Cookies();
    cookies.set("userId", randomString(), {
      path: "/",
      expires: new Date(Date.now() + 600000000),
    });
  }
  const getGames = () => {
    const g: Game = props.data[0];
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

  return (
    <Layout>
      <div>
        <p>
          <span className="title">Welcome to Hanabi-Net!</span>
          <br />A place for playing Hanabi online
        </p>
      </div>
      {/*
      <br />
      Set your name:
      <br/>
      <input
        value={this.state.hintText}
        onChange={(e: any) => this.setHint(e)}
      />
      <button onClick={this.handleSubmitGame}>Save name</button>
      */}
      <div>
        <Link href="/newGamePage">
          <button title="new game"> Start a new game </button>
        </Link>
      </div>
      <br />
      <div>{gameList(props.allCookies["userId"] as string)}</div>
      <style jsx>
        {`
          a {
            padding: 20px 30px 0px 10px;
          }
          .title {
            font-size: 25px;
          }
        `}
      </style>
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
  return { data, allCookies };
};

export default Index;
