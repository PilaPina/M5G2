'use client';

import { useEffect } from "react";

export default function FrontPage() {
  useEffect(() => {
    console.log("hello front end");
  }, []);

  return (
    <main style={{ padding: 42, fontFamily: "sans-serif" }}>
      <h1>Hello Client Side</h1>
      <p>
        This hello will be logged to the browser console, but not the server console. 
        <br />
        Only on the front end! 
      </p>
    </main>
  );
}