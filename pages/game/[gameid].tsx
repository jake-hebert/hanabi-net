import Layout from "../../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import GameCmp from "../../components/gameCmp";

const game = () => {
  const router = useRouter();
  const { gameid } = router.query;
  const id: string = gameid as string;

  return (
    <Layout>
      <GameCmp gameId={id} />
    </Layout>
  );
};

game.getInitialProps = async () => {
  return {};
};

export default game;
