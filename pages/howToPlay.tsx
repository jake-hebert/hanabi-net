import Layout from "../components/Layout";

export default function howToPlay() {
  return (
    <Layout>
      <ul>
        <li>
          The official rules from some other random site:{" "}
          <a href="https://www.ultraboardgames.com/hanabi/game-rules.php">
            [RULES!]
          </a>{" "}
        </li>
        <li>
          If you want to descend into the depths of being a huge nerd:{" "}
          <a href="https://forum.boardgamearena.com/viewtopic.php?t=5252">
            [STRATEGY!]
          </a>
        </li>
        <li>
          Tips for playing on this site:
          <ul>
            <li>
              Don't refresh your browser! Not tracking cookies yet so if you
              navigate away your browser wont remember who you are
            </li>
            <li>
              If you do naviage away, pass in the "player" param in the url of
              the game you were playing to manually set your player number
            </li>
            <li>
              "Doesnt that mean I could cheat?" Um... yeah sure. You could also
              cheat in the physical version if you really want to.
            </li>
            <li>
              When it's your turn, first select what you want to do which will
              clear the selected cards. Then you can select cards and make your
              play.
            </li>
          </ul>
        </li>
      </ul>
    </Layout>
  );
}
