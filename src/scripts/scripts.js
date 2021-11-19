/**
 * Make your magic here!
 */

// Register service worker.
if ("serviceWorker" in navigator) {
  const swPath = "sw.js";

  navigator.serviceWorker
    .register(swPath)
    .then((sw) => console.log("Service worker registered."))
    .catch((err) => console.log("Can not find service worker."));
}
