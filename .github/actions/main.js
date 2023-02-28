const core = require("@actions/core");
const github = require("@actions/github");
function run() {
  core.notice("hello from my custom javascript action");
}
run();
