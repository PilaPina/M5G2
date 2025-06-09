"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import DatabaseStatus from "./database/page";
import Button from "./components/Button";

export default function Home() {
  const [showDatabase, setShowDatabase] = useState(false);

  // Log to client (browser)
  useEffect(() => {
    console.log("hello both");
  }, []);

  // Log to server (terminal)
  if (typeof window === "undefined") {
    // This runs on the server during SSR or static rendering
    // eslint-disable-next-line no-console
    console.log("hello both");
  }

  return (
    <div className={styles.page}>
      <header>
        <h1 className={styles.title}>MongoDB Atlas</h1>
      </header>
      <main className={styles.main}>
        <Button onClick={() => setShowDatabase((prev) => !prev)}>
          {showDatabase ? "Hide Words" : "Display Words"}
        </Button>
        <div className={styles.ctas}>
          {showDatabase && <DatabaseStatus />}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://blog.stackademic.com/the-mongodb-and-next-js-stack-for-beginners-b4394872f5bb"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Mr. Smári&apos;s tutorial
        </a>
        <a
          href="https://learn.mongodb.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn MongoDB
        </a>
      </footer>
    </div>
  );
}
