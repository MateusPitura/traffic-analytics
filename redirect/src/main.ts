let raw = window.location.pathname.slice(1);

raw = decodeURIComponent(raw);

if (raw) {
  const search = window.location.search;
  const hash = window.location.hash;

  const target = raw + search + hash;

  window.location.replace(`https://${target}`);
}
