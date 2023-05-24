const { createCanvas } = require("canvas");
const prompts = require("prompts");
const { writeFileSync } = require("fs");
const { resolve } = require("path");

function log(message) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(message);
}

(async () => {
    const { resolution } = await prompts({
        name: "resolution",
        type: "text",
        message: "Enter a resolution, example: 1080x1080",
        validate: i => !i ? "You haven't entered a resolution" : !i.match(/\d+x\d+/) ? "You haven't entered a valid resolution" : true
    });
    if (!resolution) return;
    const width = Number(resolution.split("x")[0]);
    const height = Number(resolution.split("x")[1]);
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    log("Generating image...");
    for (let i = 0; i < width * height; i++) {
        const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        const x = Math.floor(i % height);
        const y = Math.floor(i / width);
        if (i % 1001 === 1000) {
            log(`Done ${i} pixels`);
        }
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
    }
    log(`Done! Saving to ${resolve(__dirname, "image.png")}...`);
    writeFileSync(resolve(__dirname, "image.png"), canvas.toBuffer());
    log(`Saved to ${resolve(__dirname, "image.png")}!`);
})();