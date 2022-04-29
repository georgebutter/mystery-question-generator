import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });
    const data = await response.json();
    setResult(data.result.question);
    setInput(data.result.topic);
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
      </Head>

      <main className={styles.main}>
        <form onSubmit={onSubmit}>
          <label>
            Create a Mystery Question about:
          </label>
          <small>Leave blank to generate a random topic</small>
          <input
            type="text"
            name="animal"
            placeholder="Enter a prompt"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input type="submit" value="Generate" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
