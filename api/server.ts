Bun.serve({
    port: 8081, // defaults to $PORT, then 3000
    fetch(req) {
        const url = new URL(req.url);
        if (url.pathname === "/") return new Response(`Home page!`);
        return new Response(`404!`);
    },
});