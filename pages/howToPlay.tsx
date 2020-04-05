import Layout from "../components/Layout";

const getUri = () => {
  if (typeof window !== "undefined") {
    return encodeURI(window.location.href);
  }
  return "serverside";
};

export default function howToPlay() {
  return (
    <Layout>
      <ul>
        <li>
          The official rules from some other random site:{" "}
          <a
            href="https://www.ultraboardgames.com/hanabi/game-rules.php"
            target="_blank"
          >
            [RULES!]
          </a>{" "}
        </li>
        <li>
          If you want to descend into the depths of being a huge nerd:{" "}
          <a
            href="https://github.com/Zamiell/hanabi-conventions"
            target="_blank"
          >
            [STRATEGY!]
          </a>
        </li>
        <li>
          Tips for playing on this site:
          <ul>
            <li>
              When it's your turn, first select what you want to do which will
              clear the selected cards. Then you can select cards and make your
              play.
            </li>
            <li>
              Use the rotation buttons to mark your cards. I like to use upside
              down to mark 5s, left to mark cards I know about and right to mark
              a card I want to take action with (play or discard)
            </li>
            <li>
              There are absolutely ways you can cheat. Just like in the physical
              version. If cheating makes things more fun for you, by all means
              cheat! I sure don't care (unless you're playing with me - then I
              will yell at you).
            </li>
          </ul>
        </li>
      </ul>
    </Layout>
  );
}
