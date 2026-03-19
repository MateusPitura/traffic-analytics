(function () {
  const ENDPOINT = "https://traffic-analytics.mateuspitura.workers.dev";

  function getData() {
    return {
      url: window.location.href,
      path: window.location.pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      language: navigator.language,
      screen: {
        width: window.screen.width,
        height: window.screen.height,
      },
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }

  function send(data: unknown) { // 🌠 improve
    try {
      navigator.sendBeacon(
        ENDPOINT,
        JSON.stringify(data)
      );
    } catch {
      fetch(ENDPOINT, {
        method: "POST",
        // body: JSON.stringify(data),
        keepalive: true,
      });
    }
  }

  const data = getData();
  send(data);
})();