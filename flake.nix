{
  description = "EloToJa's static Astro blog";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    bun2nix.url = "github:nix-community/bun2nix/2.1.2";
    bun2nix.inputs.nixpkgs.follows = "nixpkgs";
  };
  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      bun2nix,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ bun2nix.overlays.default ];
        };
        blog = pkgs.stdenvNoCC.mkDerivation {
          pname = "blog";
          version = "1.0.0";
          src = pkgs.lib.cleanSourceWith {
            src = ./.;
            filter =
              path: type:
              pkgs.lib.cleanSourceFilter path type
              && !(builtins.elem (baseNameOf path) [
                "node_modules"
                "dist"
                ".astro"
                ".vercel"
                "playwright-report"
                "test-results"
                "result"
              ]);
          };
          nativeBuildInputs = [
            pkgs.bun2nix.hook
            pkgs.nodejs
          ];
          bunDeps = pkgs.bun2nix.fetchBunDeps { bunNix = ./bun.nix; };
          bunInstallFlags = [
            "--frozen-lockfile"
            "--linker=hoisted"
          ];
          dontUseBunBuild = true;
          dontUseBunCheck = true;
          dontUseBunInstall = true;
          ASTRO_TELEMETRY_DISABLED = "1";
          buildPhase = ''
            runHook preBuild
            export XDG_CACHE_HOME="$TMPDIR/blog-cache"
            mkdir -p "$XDG_CACHE_HOME"
            bun run build
            runHook postBuild
          '';
          doCheck = true;
          checkPhase = ''
            runHook preCheck
            bun run check
            bun run lint
            bun run test
            runHook postCheck
          '';
          installPhase = ''
            runHook preInstall
            mkdir -p "$out"
            cp -r dist/. "$out/"
            runHook postInstall
          '';
        };
      in
      {
        packages.default = blog;
        checks.default = blog;
        devShells.default = pkgs.mkShell {
          packages = [
            pkgs.bun
            pkgs.nodejs
            pkgs.bun2nix
            pkgs.oxlint
            pkgs.oxfmt
          ]
          ++ pkgs.lib.optionals pkgs.stdenv.hostPlatform.isLinux [ pkgs.chromium ];
          PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH = pkgs.lib.optionalString pkgs.stdenv.hostPlatform.isLinux "${pkgs.chromium}/bin/chromium";
        };
        formatter = pkgs.nixfmt;
      }
    );
}
