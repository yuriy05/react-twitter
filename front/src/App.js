import React, { useEffect, useState } from "react";
import Page from "./component/page";
import PostList from "./container/post-list"
import { useWindowListener } from "./util/useWindowListener";

function App() {

const  [position, setPosition] = useState({ x: 0, y: 0});

 useWindowListener("pointermove", (e) => {
  setPosition({ x: e.clientX, y: e.clientY });
 });

  return(
    <Page>
      <PostList />
      <div
        style={{
          position: "absolute",
          backgroundColor: "pink",
          borderRadius: "50%",
          opacity: 0.6,
          transform: `translate(${position.x}px, ${position.y}px)`,
          pointerEvents: "none",
          left: -20,
          top: -20,
          width: 40,
          height: 40,
        }}
      >

      </div>
    </Page>
  );
}

export default App;
