# piu-piu
const CACHE_NAME = "clima-app-v1";

const ARQUIVOS_PARA_CACHE = [
  "index.html",
  "style.css",
  "script.js",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

// Guarda os arquivos no cache assim que o Service Worker é instalado
self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ARQUIVOS_PARA_CACHE);
    })
  );
});

// Intercepta cada requisição da página
self.addEventListener("fetch", (evento) => {
  evento.respondWith(
    caches.match(evento.request).then((respostaCache) => {
      return respostaCache || fetch(evento.request);
    })
  );
});
// ===================================
// REGISTRO DO SERVICE WORKER
// ===================================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then(() => {
        console.log("Service Worker registrado com sucesso.");
      })
      .catch((erro) => {
        console.error("Erro ao registrar o Service Worker:", erro);
      });
  });
}
