const { useGiteeReleases, useGithubReleases } = require("ym-release");
const { version } = require("../package.json");
const { join, basename } = require("path");
const crypto = require("crypto");
const fs = require("fs");

const { GITEE_TOKEN, GH_TOKEN } = process.env;

const giteeRelease = useGiteeReleases({
  token: GITEE_TOKEN,
  repo: "ym-video-app",
  owner: "yxingyus",
});

const githubRelease = useGithubReleases({
  token: GH_TOKEN,
  repo: "ym-video-app",
  owner: "2514765066",
});

//获取更新内容
const getDoc = version => {
  const url = join(__dirname, "../release-note.md");

  const doc = fs.readFileSync(url).toString();

  const reg = new RegExp(`## ${version}([\\s\\S]*?)##`);

  const match = doc.match(reg);

  return match ? match[1].trim() : "";
};

//获取md5
const getFileMD5 = path => {
  const buffer = fs.readFileSync(path);
  const hash = crypto.createHash("md5");
  hash.update(buffer);
  return hash.digest("hex");
};

//获取latest.json
const getLatestFile = path => {
  const md5 = getFileMD5(path);

  const name = basename(path);

  const res = {
    md5,
    version,
    name,
  };

  return new File([JSON.stringify(res)], "latest.json");
};

const main = async () => {
  const body = getDoc(version);

  const apkPath = join(__dirname, `../release/ym-video-${version}.apk`);

  const latestFile = getLatestFile(apkPath);

  await giteeRelease({
    tag: `v${version}`,
    name: version,
    body,
    filepaths: [latestFile, apkPath],
  });

  await githubRelease({
    tag: `v${version}`,
    name: version,
    body,
    filepaths: [latestFile, apkPath],
  });
};

main();
