const json = {
  plugins: [
    "@semantic-release/commit-analyzer",
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        linkReferences: false,
        linkCompare: false,
        writerOpts: {},
        presetConfig: {
          types: [
            {
              type: "feat",
              section: ":sparkles: Features",
              hidden: false,
            },
            {
              type: "fix",
              section: ":bug: Bug Fixes",
              hidden: false,
            },
          ],
        },
      },
    ],
    "@semantic-release/changelog",
    "@semantic-release/npm",
    ["@semantic-release/git", { message: "chore(release): ${nextRelease.version} \n\n${nextRelease.notes}" }],
  ],
  branches: [
    {
      name: "staging",
      channel: "beta",
      prerelease: "beta",
    },
    {
      name: "development",
      channel: "development",
      prerelease: "alpha",
    },
    "production",
  ],
};

module.exports = json;
