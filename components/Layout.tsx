import Header from "./Header";

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: "1px solid #DDD",
};

const Layout = (props: any) => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
    <style jsx global>
      {`
        .title {
          font-size: 25px;
        }
        button {
          display: inline-block;
          border: none;
          padding: 5px 10px 5px 10px;
          margin: 5px;
          text-decoration: none;
          background: blue;
          color: #ffffff;
          font-family: sans-serif;
          font-size: 12px;
          cursor: pointer;
          text-align: center;
          border-radius: 10px;
          transition: background 250ms ease-in-out, transform 150ms ease;
        }
        button:hover {
          background: lightBlue;
        }
        button:active {
          transform: scale(0.99);
        }
      `}
    </style>
  </div>
);

export default Layout;
