{
  description = "EloToJa's blog flake";

  outputs = {flake-parts, ...} @ inputs:
    flake-parts.lib.mkFlake {inherit inputs;} {
      imports = [
        inputs.devshell.flakeModule
      ];

      systems = [
        "x86_64-linux"
      ];

      perSystem = {
        system,
        pkgs,
        ...
      }: {
        _module.args.pkgs = import inputs.nixpkgs {
          inherit system;
          config = {allowUnfree = true;};
        };
        devshells.default = {
          packages = with pkgs; [
            bun
            nodejs
            chromium
          ];
          env = [
            {
              name = "PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH";
              value = "${pkgs.chromium}/bin/chromium";
            }
          ];
        };
      };
    };

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    devshell.url = "github:numtide/devshell";
  };
}
