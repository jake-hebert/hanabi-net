import Link from "next/link";

const Header = () => (
  <div className="parentDiv">
    <img
      src={"/HanabiLogo.png"}
      style={{ height: "40px", padding: "5px", borderRadius: "10%" }}
    />
    <div className="navLink">
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
    <div className="navLink">
      <Link href="/howToPlay">
        <a>How to play</a>
      </Link>
    </div>
    <div className="navLink">
      <Link href="/disclaimers">
        <a>Disclaimers</a>
      </Link>
    </div>
    <style jsx>
      {`
        a {
          text-decoration: none;
        }
        .parentDiv {
          width: 100%;
          background-color: #cce6ff;
          vertical-align: top;
        }
        .navLink {
          width: auto;
          padding: 3px;
          margin: 3px;
          border: 2px solid blue;
          display: inline-block;
          vertical-align: top;
          background-color: lightgray;
          border-radius: 10px;
        }
      `}
    </style>
  </div>
);

export default Header;
