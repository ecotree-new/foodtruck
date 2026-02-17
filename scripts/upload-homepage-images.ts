import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import * as fs from "fs";
import * as path from "path";

// R2 config (직접 로드 — dotenv 없이)
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

const SOURCE_DIR = "/Users/jay/Downloads/foodtruck/homepage_images";

// 폴더 → R2 키 섹션 매핑
const FOLDER_MAP: Record<string, string> = {
  "01. 메인": "main",
  "02. 중앙회 안내_ 인사말": "about/greeting",
  "03. 중앙회 안내_ESG": "about/esg",
  "04. 중앙회 안내_ 조직 및 지부안내": "about/organization",
  "05. 중앙회 안내_오시는 길": "about/directions",
  "06. 푸드트럭 산업 _운영": "industry/operation",
  "07. 푸드트럭 산업_세계음식": "industry/world-food",
};

// 파일명 → 깔끔한 영문 키 매핑
const FILE_MAP: Record<string, Record<string, string>> = {
  "01. 메인": {
    "01.Hero 영상.mov": "hero-video.mov",
    "02. 주요 사업 분야.jpeg": "business-area-01.webp",
    "04. 주요 사업 분야.jpeg": "business-area-02.webp",
    "05. 기대효과.png": "expected-effect-01.webp",
    "06. 기대효과.png": "expected-effect-02.webp",
    "07. 기대효과.png": "expected-effect-03.webp",
    "08. CTA.jpeg": "cta.webp",
  },
  "02. 중앙회 안내_ 인사말": {
    "01. 타이틀.jpeg": "title.webp",
    "02. 본문 이미지.jpeg": "content.webp",
  },
  "03. 중앙회 안내_ESG": {
    "01. 타이틀.jpeg": "title.webp",
    "02. Environmetal.jpeg": "environmental-01.webp",
    "04. Social.jpeg": "social-01.webp",
    "05. Social.jpeg": "social-02.webp",
    "06. Social.jpeg": "social-03.webp",
    "07. Social.jpeg": "social-04.webp",
    "08. Governance.jpeg": "governance-01.webp",
    "08. Social.jpeg": "social-05.webp",
    "09. Governance.jpeg": "governance-02.webp",
  },
  "04. 중앙회 안내_ 조직 및 지부안내": {
    "01. 타이틀.jpeg": "title.webp",
    "02. 지부 역할.png": "branch-role-01.webp",
    "03. 지부 역할.jpeg": "branch-role-02.webp",
    "04. 지부 역할.jpeg": "branch-role-03.webp",
    "05. 지부 운영 원칙.png": "branch-principle-01.webp",
    "06. 지부 운영 원칙.png": "branch-principle-02.webp",
    "07. 지부 운영 원칙.png": "branch-principle-03.webp",
  },
  "05. 중앙회 안내_오시는 길": {
    "01. 타이틀.jpeg": "title.webp",
    "02. 아이콘.png": "icon-01.webp",
    "03. 아이콘.png": "icon-02.webp",
    "04. 아이콘.png": "icon-03.webp",
  },
  "06. 푸드트럭 산업 _운영": {
    "01. 문제점.jpeg": "problem.webp",
    "02. 문제점 아이콘.png": "problem-icon-01.webp",
    "03. 문제점 아이콘.png": "problem-icon-02.webp",
    "04. 문제점 아이콘.png": "problem-icon-03.webp",
    "05. 운영 방식.png": "operation-01.webp",
    "06. 운영 방식.png": "operation-02.webp",
    "07. 운영 방식.png": "operation-03.webp",
    "08. 운영 방식.png": "operation-04.webp",
    "09. 기대효과.jpg": "expected-effect.webp",
  },
  "07. 푸드트럭 산업_세계음식": {
    "01. 메뉴 설명.jpg": "menu-description.webp",
    "02. 차별점.jpeg": "differentiator-01.webp",
    "03. 차별점.png": "differentiator-02.webp",
  },
};

async function uploadFile(
  filePath: string,
  r2Key: string,
  contentType: string
) {
  let body: Buffer;

  const ext = path.extname(filePath).toLowerCase();
  const isImage = [".jpeg", ".jpg", ".png"].includes(ext);

  if (isImage) {
    // webp 변환
    body = await sharp(filePath).webp({ quality: 85 }).toBuffer();
  } else {
    // mov, svg 등은 그대로
    body = fs.readFileSync(filePath);
  }

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: r2Key,
    Body: body,
    ContentType: contentType,
  });

  await r2Client.send(command);
  const url = `${R2_PUBLIC_URL}/${r2Key}`;
  console.log(`✅ ${r2Key} (${(body.length / 1024).toFixed(0)} KB) → ${url}`);
  return url;
}

function getContentType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const types: Record<string, string> = {
    ".webp": "image/webp",
    ".mov": "video/quicktime",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
  };
  // 이미지는 webp로 변환되므로 webp content type 사용
  if ([".jpeg", ".jpg", ".png"].includes(ext)) return "image/webp";
  return types[ext] || "application/octet-stream";
}

interface ImageMapping {
  [section: string]: {
    [key: string]: string;
  };
}

async function main() {
  const results: ImageMapping = {};
  let totalFiles = 0;

  const folders = fs.readdirSync(SOURCE_DIR).sort();

  // NFC 정규화된 매핑 생성 (macOS는 NFD로 파일명 저장)
  const normalizedFolderMap = new Map<string, string>();
  for (const [k, v] of Object.entries(FOLDER_MAP)) {
    normalizedFolderMap.set(k.normalize("NFC"), v);
  }
  const normalizedFileMap = new Map<string, Map<string, string>>();
  for (const [folder, files] of Object.entries(FILE_MAP)) {
    const nfcFiles = new Map<string, string>();
    for (const [k, v] of Object.entries(files)) {
      nfcFiles.set(k.normalize("NFC"), v);
    }
    normalizedFileMap.set(folder.normalize("NFC"), nfcFiles);
  }

  for (const folder of folders) {
    const folderPath = path.join(SOURCE_DIR, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const folderNFC = folder.normalize("NFC");
    const section = normalizedFolderMap.get(folderNFC);
    if (!section) {
      console.log(`⚠️ Unknown folder: ${folder}, skipping`);
      continue;
    }

    const fileMap = normalizedFileMap.get(folderNFC);
    if (!fileMap) {
      console.log(`⚠️ No file map for: ${folder}, skipping`);
      continue;
    }

    const files = fs.readdirSync(folderPath).sort();

    for (const file of files) {
      if (file.startsWith(".")) continue;

      const fileNFC = file.normalize("NFC");
      const targetName = fileMap.get(fileNFC);
      if (!targetName) {
        console.log(`⚠️ Unmapped file: ${folder}/${file}, skipping`);
        continue;
      }

      const filePath = path.join(folderPath, file);
      const r2Key = `homepage/${section}/${targetName}`;
      const contentType = getContentType(targetName);

      try {
        const url = await uploadFile(filePath, r2Key, contentType);

        // section 경로를 중첩 객체로
        const parts = section.split("/");
        const topLevel = parts[0];
        const subLevel = parts.length > 1 ? parts[1] : undefined;
        const keyName = targetName.replace(/\.\w+$/, "").replace(/-/g, "_");

        if (!results[topLevel]) results[topLevel] = {};

        if (subLevel) {
          const subKey = `${subLevel}_${keyName}`;
          results[topLevel][subKey] = url;
        } else {
          results[topLevel][keyName] = url;
        }

        totalFiles++;
      } catch (err) {
        console.error(`❌ Failed: ${r2Key}`, err);
      }
    }
  }

  console.log(`\n🎉 Done! Uploaded ${totalFiles} files.\n`);

  // Generate r2-images.ts mapping file
  generateMappingFile(results);
}

function generateMappingFile(results: ImageMapping) {
  const R2_BASE = "process.env.NEXT_PUBLIC_R2_PUBLIC_URL";

  let output = `const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;\n\nexport const HOMEPAGE_IMAGES = {\n`;

  // main section
  if (results.main) {
    output += `  main: {\n`;
    for (const [key, url] of Object.entries(results.main)) {
      const r2Path = url.replace(R2_PUBLIC_URL, "");
      output += `    ${key}: \`\${R2_BASE}${r2Path}\`,\n`;
    }
    output += `  },\n`;
  }

  // about section (greeting, esg, organization, directions)
  const aboutSubs = ["greeting", "esg", "organization", "directions"];
  const hasAbout = Object.keys(results.main ? {} : results).some(
    (k) =>
      aboutSubs.some((sub) =>
        Object.keys(results[k] || {}).some((key) => key.startsWith(sub))
      )
  );

  // Restructure about
  output += `  about: {\n`;
  for (const sub of aboutSubs) {
    const entries = Object.entries(results["about"] || {}).filter(([k]) =>
      k.startsWith(`${sub}_`)
    );
    if (entries.length > 0) {
      output += `    ${sub}: {\n`;
      for (const [key, url] of entries) {
        const cleanKey = key.replace(`${sub}_`, "");
        const r2Path = url.replace(R2_PUBLIC_URL, "");
        output += `      ${cleanKey}: \`\${R2_BASE}${r2Path}\`,\n`;
      }
      output += `    },\n`;
    }
  }
  output += `  },\n`;

  // industry section (operation, world-food)
  const industrySubs = ["operation", "world_food"];
  output += `  industry: {\n`;
  for (const sub of industrySubs) {
    const entries = Object.entries(results["industry"] || {}).filter(([k]) =>
      k.startsWith(`${sub}_`)
    );
    if (entries.length > 0) {
      const displaySub = sub.replace("_", "-");
      output += `    ${sub}: {\n`;
      for (const [key, url] of entries) {
        const cleanKey = key.replace(`${sub}_`, "");
        const r2Path = url.replace(R2_PUBLIC_URL, "");
        output += `      ${cleanKey}: \`\${R2_BASE}${r2Path}\`,\n`;
      }
      output += `    },\n`;
    }
  }
  output += `  },\n`;

  output += `} as const;\n`;

  const outputPath = path.join(__dirname, "../src/lib/r2-images.ts");
  fs.writeFileSync(outputPath, output);
  console.log(`📝 Generated: src/lib/r2-images.ts`);
}

main().catch(console.error);
