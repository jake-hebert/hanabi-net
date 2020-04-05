import Layout from "../components/Layout";

export default function disclaimers() {
  return (
    <Layout>
      <div>
        <ul>
          <li>
            Copyright stuff: Somebody might get mad (sorry Antoine Bauza).
            ¯\_(ツ)_/¯ Don't worry I'm not making any money. Also, you should
            just{" "}
            <a
              href="https://www.amazon.com/Games-Hanabi-Card-Game/dp/B00CYQ9Q76"
              target="_blank"
            >
              buy the real game
            </a>{" "}
            cause it's great.
          </li>
          <li>
            Cookie stuff: This site uses cookies to store a made up player ID
            (so you can rejoin games as the same player if you leave or
            accidentally refresh) and whatever name you put in
          </li>
          <li>
            Personal information: Stores your player name in a database so other
            players can see your name while you play. Please don't put your
            social security number in there.
          </li>
          <li>
            Have an idea? See a bug? Want to make my crappy UI look better?{" "}
            <a href="https://github.com/jake-hebert/hanabi-net" target="_blank">
              Here is the github
            </a>
            !
          </li>
        </ul>
      </div>
    </Layout>
  );
}
