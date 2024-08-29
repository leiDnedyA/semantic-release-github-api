# POST `semantic-release` release data via the GitHub API

This plugin allows you to POST semantic-release data to a user's repo via the [GitHub releases API](https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28).

## How to use

The plugin requires the following environment variables to be accessable by `npx semantic-release`:
```bash
GITHUB_ACCESS_TOKEN=ghu_xxxxxxxxx
APP_REPO_URL=https://github.com/REPO_OWNER/REPO_NAME
```

## Example usage

To install via NPM, run the following
```bash
# the project is not currently published on NPM, so it has to be linked via github URL
npm install semantic-release https://github.com/leiDnedyA/semantic-release-github-api -D
```

Here's an example `.releaserc.json` configuration:

```json
{
  "branches": ["main"],
  "dryRun": false,
  "ci": false,
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "semantic-release-github-api"
  ]
}
```

Since this is meant to be run either locally or in CI environments like Jenkins which aren't normally supported by `semantic-release`, you probably want to set `ci` and `dryRun` to false.

To run `semantic-release`

```bash
npx semantic-release
```
