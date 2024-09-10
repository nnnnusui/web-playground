import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import simpleGit from "simple-git";

const checkAllWith = [
  // /package.json/,
  /\.storybook\/.*/,
];

const screenshot = async (page: Page, path: string) => {
  await page.goto(path);

  await page.waitForSelector("body.sb-show-main");

  await expect(page).toHaveScreenshot({ fullPage: true });
};

const getModuleMap = (statsJson: Stats) => {
  const pathIncludes = (path: string) => {
    if (path.startsWith("./src")) return true;
    return false;
  };

  return new Map(
    statsJson.modules
      .filter((it) => pathIncludes(it.id))
      .map((it) => ([
        it.id,
        it.reasons
          .map((it) => it.moduleName)
          .filter((it) => pathIncludes(it)),
      ] as const))
      .filter(([, reasons]) => reasons.length !== 0),
  );
};

const getStoryPathMap = (indexJson: StorybookIndex) => {
  const map = new Map<string, StorybookIndex["entries"][string][]>();
  Object.values(indexJson.entries)
    .filter((it) => it.type !== "docs")
    .forEach((it) => {
      const ids = map.get(it.importPath);
      if (ids != null) return ids.push(it);
      map.set(it.importPath, [it]);
    });
  return map;
};

const getUpdatedStories = async () => {
  const generateAll = !!process.env.VRT_GENERATE;
  const baseBranch = process.env.VRT_DIFF_BASE;
  if (baseBranch == null) throw new Error("env.VRT_DIFF_BASE not found.");
  const pwd = process.cwd();
  // await simpleGit().add(["-N", "."]);
  const diffSummary = await simpleGit().diffSummary(baseBranch);
  const diffFilePaths = diffSummary.files.map((it) => `./${it.file}`);
  const storybookStaticDir = path.join(pwd, "storybook-static");
  const statsJsonPath = path.join(storybookStaticDir, "preview-stats.json");
  const statsJson: Stats = JSON.parse(fs.readFileSync(statsJsonPath).toString());
  const indexJsonPath = path.join(storybookStaticDir, "index.json");
  const indexJson: StorybookIndex = JSON.parse(fs.readFileSync(indexJsonPath).toString());
  const storyPathMap = getStoryPathMap(indexJson);

  const allStories = () => Array.from(storyPathMap.values()).flatMap((_) => _);
  const checkAllWithIt = diffFilePaths.find((path) => !!checkAllWith.find((regex) => regex.test(path)));
  const checkAll = !!checkAllWithIt;
  if (checkAll) console.log(`[checkAllWithIt] ${checkAllWithIt}`);
  if (generateAll || checkAll) return allStories();

  if (diffSummary.files.length === 0) return [];
  const reasonsMap = getModuleMap(statsJson);
  const relatedPaths = new Set(
    diffFilePaths.flatMap((diffPath) => {
      const recursionSearch = (path: string): string[] => {
        const reasons = reasonsMap.get(path);
        if (reasons == null) return [path];
        return [path, ...reasons.flatMap(recursionSearch)];
      };
      return recursionSearch(diffPath);
    }),
  );
  const relatedStoryPaths = Array.from(relatedPaths.values())
    .filter((it) => it.endsWith(".stories.tsx"));
  const relatedStories = relatedStoryPaths
    .flatMap((it) => storyPathMap.get(it) ?? []);
  return relatedStories;
};

type Stats = {
  modules: {
    id: string;
    name: string;
    reasons: {
      moduleName: string;
    }[];
  }[];
};

type StorybookIndex = {
  v: number;
  entries: Record<string, {
    type: string;
    id: string;
    name: string;
    title: string;
    importPath: string;
    componentPath?: string;
    tags: string[];
    storiesImports?: string[];
  }>;
};

const stories = await getUpdatedStories();

if (stories.length === 0) {
  // eslint-disable-next-line vitest/no-conditional-tests
  test("No tests found", async ({ browserName, isMobile }) => {
    const browserInfo = `${isMobile ? "mobile " : ""}${browserName}`;
    console.log(`[vrt ${browserInfo}] No tests found`);

    expect("").toBe("");
  });
} else {
  for (const story of stories) {
    const name = `${story.title} ${story.name}`;

    test(name, async ({ page, browserName, isMobile }) => {
      const browserInfo = `${isMobile ? "mobile " : ""}${browserName}`;
      console.log(`[vrt ${browserInfo}]: ${name}`);
      await screenshot(page, `/iframe.html?id=${story.id}`);
    });
  }
}
