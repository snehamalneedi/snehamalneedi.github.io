const fs = require("fs");
const path = require("path");
const fse = require("fs-extra");
const axios = require("axios");
const { chromium } = require("playwright");

const links = fs
    .readFileSync("editing_links.txt", "utf8")
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

const THUMB_DIR = path.join(__dirname, "thumbnails");
fse.ensureDirSync(THUMB_DIR);

// ----------------------------------
// Helpers
// ----------------------------------

function filenameFromUrl(url) {
    const id =
        url.split("/reel/")[1]?.split("/")[0] ||
        url.split("/p/")[1]?.split("/")[0] ||
        url.split("/video/")[1]?.split("/")[0] ||
        Math.random().toString(36).slice(2, 10);

    return `${id}.jpg`;
}

async function downloadFile(url, filePath) {
    const res = await axios.get(url, { responseType: "stream" });

    return new Promise((resolve, reject) => {
        const writer = fs.createWriteStream(filePath);
        res.data.pipe(writer);

        writer.on("finish", resolve);
        writer.on("error", reject);
    });
}

// ----------------------------------
// Scraper
// ----------------------------------

async function scrape(page, url) {
    try {
        await page.goto(url, {
            waitUntil: "domcontentloaded",
            timeout: 60000
        });

        await page.waitForTimeout(2000);

        // ----------------------------------
        // Extract OG metadata (IMPORTANT PART)
        // ----------------------------------
        const data = await page.evaluate(() => {
            const getMeta = (key) =>
                document.querySelector(`meta[property='${key}']`)?.content ||
                document.querySelector(`meta[name='${key}']`)?.content;

            return {
                image: getMeta("og:image") || "",
                title: getMeta("og:title") || document.title || "",
                description: getMeta("og:description") || ""
            };
        });

        // ----------------------------------
        // Build thumbnail
        // ----------------------------------
        const filename = filenameFromUrl(url);
        const filePath = path.join(THUMB_DIR, filename);

        let thumbnail = "";

        if (data.image) {
            await downloadFile(data.image, filePath);
            thumbnail = `thumbnails/${filename}`;
        }

        console.log("✔ Scraped:", url);

        return {
            url,
            platform: url.includes("tiktok") ? "TikTok" : "Instagram",
            title: data.title
                .replace("Instagram", "")
                .replace("TikTok", "")
                .trim(),
            captionSnippet: (data.description || "").slice(0, 160),
            thumbnail,
            featured: false
        };
    } catch (err) {
        console.log("✖ Failed:", url);

        return {
            url,
            platform: url.includes("tiktok") ? "TikTok" : "Instagram",
            title: "",
            captionSnippet: "",
            thumbnail: "",
            featured: false
        };
    }
}

// ----------------------------------
// Runner
// ----------------------------------

async function run() {
    const browser = await chromium.launch({
        headless: true
    });

    const page = await browser.newPage();

    const results = [];

    for (let i = 0; i < links.length; i++) {
        console.log(`Scraping (${i + 1}/${links.length})`);
        const data = await scrape(page, links[i]);
        results.push(data);

        await page.waitForTimeout(1000);
    }

    await browser.close();

    fs.writeFileSync(
        "editingData.json",
        JSON.stringify(results, null, 2)
    );

    console.log("Done → editingData.json created");
    
}

run();