# 🛰️ Cyclops Drive — in-car camera alerts (PWA)

A self-contained Progressive Web App that gives **voice + on-screen warnings** about
speed / red-light enforcement cameras in **Israel**, using your vehicle's GPS. Open the URL
in the car's multimedia browser (or a mounted phone), tap **Старт**, and drive.

- **GPS-driven**: uses the browser Geolocation API (live position, speed, heading).
- **Voice alerts**: switchable **English / Русский / עברית / العربية** (Web Speech API).
- **Map + HUD**: Leaflet/OpenStreetMap map with your position and cameras, plus a large
  speed + nearest-camera warning panel.
- **Offline**: a service worker caches the app, the camera database, and visited map tiles,
  so it keeps working without signal after the first load.
- **No backend / no tracking**: 100% client-side static files; your location never leaves
  the device.

## Data
`cameras.json` — **1,841** camera points: 1,750 decoded from the on-device IROAD/GNET
`safetycam_il.dat` (the camera's own database) enriched with type/speed where a matching
OpenStreetMap/community point exists, plus extra OSM coverage. Speed limit and exact type
are only present where an external source provides them (the device file stores location +
a coarse class only).

## Alert logic (reconstructed from the dashcam firmware "Cyclops" engine)
On each GPS update the app finds cameras **ahead** on your heading, computes great-circle
distance, and announces at a **speed-scaled lead distance** (~18 s of travel, clamped
180–900 m): `"<type> ahead, N meters"`, an over-speed prompt when the posted limit is known
and exceeded, and clears once you pass.

## Run / host
Pure static files — host anywhere over **HTTPS** (Geolocation requires a secure context):
```
# local test
python -m http.server 8080      # then open http://localhost:8080
```
Deployed via **GitHub Pages**.

> ⚠️ Driver aid only. Coverage is partial and may be out of date — obey all traffic laws and
> keep your eyes on the road. Camera coordinates are public data (device DB + OpenStreetMap, ODbL).
