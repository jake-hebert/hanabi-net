import Link from "next/link";
import Layout from "../components/Layout";

export default function Index() {
  return (
    <Layout>
      <div>
        <p>
          <span className="title">Welcome to Hanabi-Net!</span>
          <br />A place for... hopefully, eventually playing Hanabi online
        </p>
      </div>
      <br />
      <div>
        <Link href="/newGame">
          <button title="new game"> Start a game </button>
        </Link>
      </div>
      <br />
      <div>
        <p>
          Game 12345 - Waiting for players
          <br />
          2/4 players
          <br />
          <button>Join Game</button>
        </p>
      </div>
      <div>
        <p>
          Game 09876 - Waiting for players
          <br />
          3/4 players
          <br />
          <button>Join Game</button>
        </p>
      </div>
      <div>
        <p>
          Game 23232 - playing
          <br />
          3/3 players
        </p>
      </div>
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
}
