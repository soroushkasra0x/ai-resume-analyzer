import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";

// Chrome DevTools probes this path on every page load to discover an "automatic
// workspace folder". React Router has no route for it, so the request reaches the
// SSR handler and logs a full 404 stack trace to the terminal. Answer it here,
// before the router sees it. `enforce: "pre"` puts this middleware ahead of the
// react-router dev middleware; `apply: "serve"` keeps it out of the build.
const ignoreChromeDevtoolsProbe = (): Plugin => ({
  name: "ignore-chrome-devtools-probe",
  enforce: "pre",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url?.startsWith("/.well-known/appspecific/com.chrome.devtools.json")) {
        res.statusCode = 404;
        res.end();
        return;
      }
      next();
    });
  },
});

export default defineConfig({
  plugins: [ignoreChromeDevtoolsProbe(), tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
});
