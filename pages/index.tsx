import Link from "next/link";
import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";
import { Game } from "../types";
import GameDetails from "../components/gameDetails";

const Index = (data: any) => {
  const getGames = () => {
    let dataKeys = Object.keys(data);
    let games: Game[] = [];
    let values = Object.values(data);
    for (let i = 0; i < values.length - 1; i++) {
      games.push(values[i] as Game);
    }
    return games;
  };

  const gameList = getGames().map(g => (
    <GameDetails game={g} key={g._id as string} />
  ));

  return (
    <Layout>
      <div>
        <p>
          <span className="title">Welcome to Hanabi-Net!</span>
          <br />A place for playing Hanabi online
        </p>
      </div>
      <br />
      <div>
        <Link href="/newGamePage">
          <button title="new game"> Start a game </button>
        </Link>
      </div>
      <br />
      <div>{gameList}</div>
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

Index.getInitialProps = async () => {
  const baseUri =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://hanabi-net.herokuapp.com";
  const res = await fetch(baseUri + "/api/games", {
    method: "get"
  });

  const data = await res.json();
  return data;
};

export default Index;
