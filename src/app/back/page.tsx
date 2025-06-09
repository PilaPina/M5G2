
export default function BackPage() {
    console.log("hello back end");
  // This will log to the server console (terminal) when the page is rendered
  return (
    <main style={{ padding: 42, fontFamily: "sans-serif" }}>
      <h1>Hello Server Side</h1>
      <p>This content is rendered on the server.</p>
      <p>This will only be shown on the server.</p>
    </main>
  );
}
