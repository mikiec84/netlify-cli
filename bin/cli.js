#!/usr/bin/env node

var program    = require("commander"),
    config     = require("./../lib/settings/config"),
    createSite = require("./../lib/commands/create_site"),
    deleteSite = require("./../lib/commands/delete_site"),
    deploy     = require("./../lib/commands/deploy"),
    publish    = require("./../lib/commands/publish"),
    init       = require("./../lib/commands/init"),
    updateSite = require("./../lib/commands/update_site");

program
  .version("0.0.1")
  .option("-t --access-token <token>", "Override the default Access Token")

program
  .command("init")
  .description("Configure automated deployments for the current dir")
  .action(config.wrap(program, init.cmd));

program
  .command("create")
  .description("Create a new site")
  .option("-n --name [name]", "Set <name>.netlify.com")
  .option("-d --domain [domain]", "Set the custom domain for the site")
  .option("-p --password [password]", "Set the password for the site")
  .option("-w --write", "Save the site id to the local .netlify config file")
  .action(config.wrap(program, createSite.cmd));

program
  .command("update")
  .description("Updates attributes of a site")
  .option("-s --site-id [id]", "The site to update")
  .option("-n --name [name]", "Set <name>.netlify.com")
  .option("-d --domain [domain]", "Set the custom domain for the site")
  .option("-p --password [password]", "Set the password for the site")
  .action(config.wrap(program, updateSite.cmd));

program
  .command("deploy")
  .description("Deploy a new version")
  .option("-s --site-id [id]", "Deploy to site with <id>")
  .option("-p --path [path]", "Path to a folder or zip file to deploy")
  .option("-d --draft", "Deploy as a draft without publishing")
  .option("-w --write", "Save the site id and path to the local .netlify file")
  .action(config.wrap(program, deploy.cmd));

program
  .command("publish <deploy_id>")
  .description("Publish a specific deploy")
  .action(config.wrap(program, publish.cmd));

program
  .command("delete")
  .description("Deletes a site")
  .option("-s --site-id [id]", "The id of the site to delete")
  .option("-y --yes", "Don't prompt for confirmation")
  .action(config.wrap(program, deleteSite.cmd));

program.parse(process.argv);

if(!program.args.length) {
  program.help();
}