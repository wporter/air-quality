const { SitemapStream, streamToPromise } = require("sitemap");
const fs = require("fs");
const path = require("path");

const generateSitemap = async () => {
  const routes = [
    "/",
    "/about",
    "/login",
    // Add more routes as needed
  ];

  const urls = routes.map((route) => ({
    url: route,
    changefreq: "daily",
    priority: 0.7,
  }));

  const stream = new SitemapStream({ hostname: "https://omegainitiative.com" });
  urls.forEach((url) => stream.write(url));
  stream.end();

  const sitemap = await streamToPromise(stream);
  fs.writeFileSync(path.resolve("./public/sitemap.xml"), sitemap.toString());
  console.log("Sitemap generated successfully.");
};

generateSitemap();
