import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import * as fs from "fs";
import * as path from "path";

const R2_ACCOUNT_ID = "40a22af6dd5276a0b03b57a6c8c42838";
const R2_ACCESS_KEY_ID = "26765deebdb73d7a61d41de6b080d253";
const R2_SECRET_ACCESS_KEY =
  "9015d291e65135d1bd885e09a2e0584016ed4d0dcde6982f65946b177e04e673";
const R2_BUCKET_NAME = "foodtruck-assets";
const R2_PUBLIC_URL = "https://pub-8ba77ae4d6be44b2b12c9762cc3ef01a.r2.dev";

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

interface UploadTask {
  source: string;
  r2Key: string;
  convertToWebp: boolean;
}

const tasks: UploadTask[] = [
  {
    source: "/Users/jay/Downloads/environmental_02.png",
    r2Key: "homepage/about/esg/environmental-02.webp",
    convertToWebp: true,
  },
];

async function upload(task: UploadTask) {
  let body: Buffer;

  if (task.convertToWebp) {
    body = await sharp(task.source).webp({ quality: 85 }).toBuffer();
  } else {
    body = fs.readFileSync(task.source);
  }

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: task.r2Key,
    Body: body,
    ContentType: "image/webp",
  });

  await r2Client.send(command);
  const url = `${R2_PUBLIC_URL}/${task.r2Key}`;
  console.log(`✅ ${task.r2Key} (${(body.length / 1024).toFixed(0)} KB) → ${url}`);
}

async function main() {
  for (const task of tasks) {
    if (!fs.existsSync(task.source)) {
      console.error(`❌ File not found: ${task.source}`);
      continue;
    }
    await upload(task);
  }
  console.log("\n🎉 Done!");
}

main().catch(console.error);
