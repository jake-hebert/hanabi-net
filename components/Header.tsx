import Link from "next/link";

const Header = () => (
  <div className="parentDiv">
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/howToPlay">
      <a>How to play</a>
    </Link>
    <style jsx>
      {`
        a {
          padding: 20px 30px 0px 10px;
        }
        .parentDiv {
          width: 100%;
          height: 30px;
          background-color: #cce6ff;
          //border-style: solid;
          //border-width: 0px 0px 0px 20px;
        }
      `}
    </style>
  </div>
);

export default Header;
