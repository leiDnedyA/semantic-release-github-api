
async function postNewVersion(nextRelease) {
  const { type, channel, gitHead, version, gitTag, name } = nextRelease;


}

async function publish(pluginConfig, context) {
  const { nextRelease } = context;
  await postNewVersion(nextRelease);
}

module.exports = publish;
