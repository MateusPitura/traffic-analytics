// const URL = "http://localhost:8787";
const URL = 'https://traffic-analytics.mateuspitura.workers.dev'

export function App() {
  return (
    <button
      onClick={async () => {
        await fetch(URL, {
          method: "POST",
          credentials: "include",
        });
      }}
    >
      Click me
    </button>
  );
}
