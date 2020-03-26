import Layout from "../../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import GameCmp from "../../components/gameCmp";

const game = () => {
  const router = useRouter();
  const { gameid, player } = router.query;
  console.log("player num" + player);
  const id: string = gameid as string;
  let p: number | undefined = player
    ? parseInt(player as string, 10)
    : undefined;

  return (
    <Layout>
      <GameCmp gameId={id} playerNumber={p} />
    </Layout>
  );
};

game.getInitialProps = async () => {
  return {};
};

export default game;
