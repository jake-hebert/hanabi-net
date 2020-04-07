import Layout from "../../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import GameCmp from "../../components/gameCmp";
import cookies from "next-cookies";
import { BrowserCookies } from "../../types";

interface GamePageProps {
  allCookies: BrowserCookies;
}

const game = (props: GamePageProps) => {
  const router = useRouter();
  const { gameid, player } = router.query;
  const id: string = gameid as string;
  let p: number | undefined = player
    ? parseInt(player as string, 10)
    : undefined;

  return (
    <Layout>
      <GameCmp gameId={id} playerNumber={p} cookies={props.allCookies} />
    </Layout>
  );
};

game.getInitialProps = async (ctx: any) => {
  let allCookies = cookies(ctx);
  return { allCookies: allCookies };
};

export default game;
