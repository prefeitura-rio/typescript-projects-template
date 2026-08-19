# devenv.nix — Development environment for the npm library template.
#
# Provides the Node.js toolchain and pnpm for local development. Tool versions
# are pinned by the nixpkgs snapshot in devenv.lock — never pin individual
# packages here.
#
# Quality checks (formatting, linting, type-checking, tests) are owned by the
# CI quality gate action (prefeitura-rio/actions). See https://devenv.sh.

{ pkgs, ... }:

{
  name = "library";

  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_24;
    pnpm = {
      enable = true;
      # Automatically runs `pnpm install` when entering the dev shell,
      # keeping node_modules in sync with pnpm-lock.yaml.
      install.enable = true;
    };
  };

  git-hooks.hooks = {
    ripsecrets.enable = true;

    no-commit-to-branch = {
      enable = true;
      settings.branch = [ "master" "main" ];
    };
  };
}
