const AggregateError = require("aggregate-error");

class MissingGitHubRepoUrlError extends Error {
  constructor() {
    super("Missing 'APP_REPO_URL' environment variable.");
  }
}

class MissingGitHubTokenError extends Error {
  constructor() {
    super("Missing GITHUB_ACCESS_TOKEN environment variable.");
  }
}

class InvalidGitHubTokenError extends Error {
  constructor() {
    super("Invalid GITHUB_ACCESS_TOKEN, API request failed.");
  }
}

/**
 * @returns {Promise<string>} User's username
 */
async function validateGitHubAccessToken(token) {
  const url = 'https://api.github.com/user';

  return await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      return data.login;
    })
    .catch(_ => {
      throw new InvalidGitHubTokenError();
    });
}

async function verify(pluginConfig, context) {
  const { logger, env } = context;
  const errors = [];

  if (!env.APP_REPO_URL) {
    errors.push(new MissingGitHubRepoUrlError());
  }

  logger.log("Validating GitHub token...");

  if (!env.GITHUB_ACCESS_TOKEN) {
    errors.push(new MissingGitHubTokenError());
  } else {
    const token = env.GITHUB_ACCESS_TOKEN;
    try {
      const gitHubUsername = await validateGitHubAccessToken(token);
      logger.log(`Successfully validated GitHub token for user "${gitHubUsername}"`);
    } catch (error) {
      errors.push(error);
    }
  }

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }
}

module.exports = verify;
