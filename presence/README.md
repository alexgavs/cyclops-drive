# Cyclops Drive presence backend

Cloudflare Worker + Durable Object for anonymous live client markers.

## Deploy

1. Install Wrangler: npm install -g wrangler
2. Log in: wrangler login
3. From this directory run: wrangler deploy
4. Copy the resulting workers.dev URL into PRESENCE_WS in index.html, using wss://.../ws

No permanent user identifier is stored. Each WebSocket session gets a new random temporary ID. Inactive sessions expire after 60 seconds.
