const http = require("http");
const fs = require("fs");
const path = require("path");

/**
 * @type {number}
 */
const PORT = process.argv[2];
/**
 * @type {string}
 */
const RESOURCE_DIRECTORY = process.argv[3];

/**
 * @enum
 */
const CONTENT_TYPES = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".json": "application/json",
};

/**
 * Sends the content of a file as the response.
 * @param {http.ServerResponse} res The response object.
 * @param {string} filePath The path to the file to be sent.
 * @param {string} contentType The content type of the file being sent.
 */
const sendFile = (res, filePath, contentType) => {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Server Error");
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content);
        }
    });
};

/**
 * Generates the HTML content for the editor page.
 * @param {Object} config The configuration object (window.config).
 * @param {string} apiSrc The source URL for the DocsAPI script.
 * @returns {string} The generated HTML content as a string.
 */
const generateHtml = (config, apiSrc) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="text/javascript">
        window.onload = function () {
            if (window.DocsAPI) {
                window.docEditor = new DocsAPI.DocEditor("placeholder", ${JSON.stringify(config)});
            }
        };
    </script>
    <script type="text/javascript" src="${apiSrc}"></script>
    <title>Document</title>
</head>
<body>
    <div id="placeholder"></div>
</body>
</html>`;
};

/**
 * Handles the POST request to update the configuration and API source.
 * @param {http.IncomingMessage} req The request object.
 * @param {http.ServerResponse} res The response object.
 */
const handlePostRequest = (req, res) => {
    let body = "";

    req.on("data", (chunk) => {
        body += chunk;
    });

    req.on("end", () => {
        try {
            const data = JSON.parse(body);
            const config = data.config;
            const apiSrc = data.apiSrc;

            if (!config || !apiSrc) {
                res.writeHead(400, { "Content-Type": "text/plain" });
                res.end("Missing config or apiSrc in the request body");
                return;
            }
            const html = generateHtml(config, apiSrc);
            const indexPath = path.join(RESOURCE_DIRECTORY, "index.html");
            fs.writeFile(indexPath, html, (err) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("Error writing index.html");
                } else {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ success: true }));
                }
            });
        } catch (err) {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("Invalid JSON");
        }
    });
};

/**
 * Creates and starts the HTTP server that serves static files and handles POST requests.
 */
const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/update") {
        handlePostRequest(req, res);
    } else {
        const requestedPath = req.url.split("?")[0] === "/" ? "index.html" : req.url.split("?")[0];
        const filePath = path.join(RESOURCE_DIRECTORY, requestedPath);
        const ext = path.extname(filePath);
        const contentType = CONTENT_TYPES[ext] || "text/plain";

        fs.stat(filePath, (err, stats) => {
            if (!err && stats.isFile()) {
                sendFile(res, filePath, contentType);
            } else {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("Not Found");
            }
        });
    }
});

/**
 * Starts the server and logs the running status.
 */
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} and serving files from ${RESOURCE_DIRECTORY}`);
});
