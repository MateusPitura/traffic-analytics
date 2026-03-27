import app from "./app";

const PORT = 8592;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
