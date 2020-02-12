import Layout from "../components/Layout";
import Link from "next/link";
import { Game } from "../types";

interface GameProps {
  game: Game;
}

export default function thisGame() {
  return (
    <Layout>
      <div> a game</div>
    </Layout>
  );
}
