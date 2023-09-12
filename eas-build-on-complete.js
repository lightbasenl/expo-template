const axios = require("axios");

const url = process.env.SLACK_WEBHOOK_URL;

if (url != null) {
  const releaseNotes = process.env.COMMIT_MESSAGE;
  const slackReleaseNotes = releaseNotes
    .replace(/^###?\s*(.*)$/gm, "*$1*") // wrap lines starting with ### with *
    .replace(/^##?\s*(.*)$/gm, "*$1*") // wrap lines starting with ## with *
    .replace(/^\*\s(.*)$/gm, "- $1"); // replace * with - for list items

  if (process.env.EAS_BUILD_STATUS === "finished") {
    let slackMessage = `*${process.env.npm_package_name} - ${process.env.npm_package_version}* \nNew Android builds available \n\nRelease Notes: ${slackReleaseNotes}\n\nhttps://expo.dev/accounts/lightbase/projects/${process.env.npm_package_name}/builds/${process.env.EAS_BUILD_ID}`;

    // production and ios builds are not distributed/downloaded via expo but uploaded to the playstore/testflight
    if (process.env.EAS_BUILD_PROFILE === "production" || process.env.EAS_BUILD_PLATFORM === "ios") {
      slackMessage = `*${process.env.npm_package_name} - ${process.env.npm_package_version}* \n${process.env.EAS_BUILD_PLATFORM} build uploaded to store \n\nRelease Notes: ${slackReleaseNotes}`;
    }
    axios
      .post(url, { text: slackMessage })
      .then((res) => {
        console.log(`Status: ${res.status}`);
        console.log(`Message: ${res.data}`);
      })
      .catch((err) => console.error(err));
  } else if (process.env.EAS_BUILD_STATUS === "error") {
    axios
      .post(url, {
        text: `🛑 *${process.env.EAS_BUILD_PLATFORM}Build for ${process.env.npm_package_name} - ${process.env.npm_package_version} has failed* 🛑 \n\nhttps://expo.dev/accounts/lightbase/projects/${process.env.npm_package_name}/builds/${process.env.EAS_BUILD_ID}`,
      })
      .then((res) => {
        console.log(`Status: ${res.status}`);
        console.log(`Message: ${res.data}`);
      })
      .catch((err) => console.error(err));
  }
}
