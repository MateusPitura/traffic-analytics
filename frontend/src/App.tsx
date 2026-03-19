export function App() {
  return (
    <button
      onClick={async () => {
        await fetch("http://localhost:8787", {
          method: "POST",
          credentials: "include",
        });
      }}
    >
      Click me
    </button>
  );
}
