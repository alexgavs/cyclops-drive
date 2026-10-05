export class PresenceRoom {
  constructor(state, env) {
    this.state = state;
    this.sessions = new Map();
  }

  async fetch(request) {
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("WebSocket required", { status: 426 });
    }
    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];
    server.accept();

    const id = crypto.randomUUID().slice(0, 8);
    this.sessions.set(server, { id, updated: Date.now() });
    server.send(JSON.stringify({ type: "welcome", id }));

    server.addEventListener("message", event => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type !== "position") return;
        const lat = Number(msg.lat), lon = Number(msg.lon);
        if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) return;
        const session = this.sessions.get(server);
        if (!session) return;
        Object.assign(session, {
          lat, lon,
          speed: Number.isFinite(Number(msg.speed)) ? Number(msg.speed) : 0,
          heading: Number.isFinite(Number(msg.heading)) ? Number(msg.heading) : null,
          updated: Date.now()
        });
        this.broadcast();
      } catch {}
    });

    const remove = () => { this.sessions.delete(server); this.broadcast(); };
    server.addEventListener("close", remove);
    server.addEventListener("error", remove);
    return new Response(null, { status: 101, webSocket: client });
  }

  broadcast() {
    const now = Date.now();
    const clients = [];
    for (const [ws, s] of this.sessions) {
      if (now - s.updated > 60000) { try { ws.close(); } catch {} this.sessions.delete(ws); continue; }
      if (Number.isFinite(s.lat) && Number.isFinite(s.lon)) clients.push({ id: s.id, lat: s.lat, lon: s.lon, speed: s.speed, heading: s.heading, updated: s.updated });
    }
    const payload = JSON.stringify({ type: "clients", clients });
    for (const ws of this.sessions.keys()) { try { ws.send(payload); } catch {} }
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== "/ws") return new Response("Cyclops Drive presence server");
    const id = env.PRESENCE.idFromName("global");
    return env.PRESENCE.get(id).fetch(request);
  }
};
