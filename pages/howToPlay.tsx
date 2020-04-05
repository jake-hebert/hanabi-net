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
      <div>
        {/*}
        <iframe
          src={
            "http://servcloud-vs.cs54.force.com/CaseCreate?isdtp=mn&url=" +
            getUri()
          }
        />
        */}
        {/*
        <form
          action="https://callawaycloud--partial.my.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8"
          method="POST"
        >
          <input type="hidden" name="orgid" value="00DL00000061lsC" />
          <input
            type="hidden"
            name="retURL"
            value="https://hanabi-net.herokuapp.com/howToPlay"
          />
          <label htmlFor="name">Contact Name</label>
          <input id="name" name="name" size={20} type="text" />
          <br />
          <label htmlFor="email">Email</label>
          <input id="email" name="email" size={20} type="text" />
          <br />
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" size={20} type="text" />
          <br />
          <label htmlFor="subject">Subject</label>
          <input id="subject" name="subject" size={20} type="text" />
          <br />
          <label htmlFor="description">Description</label>
          <textarea name="description"></textarea>
          <br />
          <input type="hidden" id="external" name="external" value="1" />
          <br />
          <input type="submit" name="submit" />
        </form>
        */}
      </div>
    </Layout>
  );
}
