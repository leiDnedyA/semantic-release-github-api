const verifyLogic = require("./src/verify");
const publishLogic = require("./src/publish");

/**
 * Called by semantic-release during the verification step
 * @param {*} pluginConfig The semantic-release plugin config
 * @param {*} context The context provided by semantic-release
 */
async function verifyConditions(pluginConfig, context) {
  await verifyLogic(pluginConfig, context);
}

async function verifyRelease(pluginConfig, context) {
  await publishLogic(pluginConfig, context);
}

module.exports = {
  verifyConditions,
  verifyRelease
}
