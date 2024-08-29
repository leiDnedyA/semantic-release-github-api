
async function postNewVersion(nextRelease, repoUrl) {
  const { type, channel, gitHead, version, gitTag, name } = nextRelease;

}

async function publish(pluginConfig, context) {
  const { nextRelease } = context;
  await postNewVersion(nextRelease, env.APP_REPO_URL);
}

module.exports = publish;
