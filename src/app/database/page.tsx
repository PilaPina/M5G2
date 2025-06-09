'use client';

import { useEffect, useState } from "react";
import styles from "./page.module.css";

// Helper to shuffle an array
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function DatabaseStatus() {
  const [status, setStatus] = useState<string>("Loading...");
  const [displayWords, setDisplayWords] = useState<{ word: string }[]>([]);

  useEffect(() => {
    fetch("/api/database")
      .then(res => res.json())
      .then(data => {
        setStatus(data.message || data.error || "Unknown response");
        if (Array.isArray(data.words)) {
          setDisplayWords(shuffle(data.words as { word: string }[]).slice(0, 4));
        }
      })
      .catch(() => setStatus("Error connecting to backend"));
  }, []);

  return (
    <main className={styles.main}>
      <h2>Are we connected?</h2>
      <p>{status}</p>
      <div className={styles.listHeader}>
        <h3>The requested word salad:</h3>
        <ul className={styles.wordList}>
          {displayWords.map((wordObj, idx) => (
            <li key={idx}>{wordObj.word}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}