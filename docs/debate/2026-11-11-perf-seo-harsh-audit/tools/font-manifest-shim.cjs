// Test-harness shim (2026-11-11 audit), loaded with NODE_OPTIONS=--require. Nothing on disk is modified.
// Why: Next 15.5's next-font-manifest-plugin matches `mod.request.includes('/next-font-loader/index.js?')`.
// On Windows the request path uses backslashes, so the manifest stays empty and a local build ships NO font preload
// links, unlike the Linux build Vercel produces. This rewrites that one test in memory so the local build matches a
// Linux build, which is what visitors would receive.
const Module = require("module");
const fs = require("fs");
const orig = Module._extensions[".js"];
Module._extensions[".js"] = function (mod, filename) {
  if (filename.endsWith("next-font-manifest-plugin.js")) {
    const src = fs.readFileSync(filename, "utf8");
    const patched = src.replace(
      "_mod_request.includes('/next-font-loader/index.js?')",
      "/[\\\\/]next-font-loader[\\\\/]index\\.js\\?/.test(_mod_request)"
    );
    if (patched === src) process.stderr.write("[font-shim] pattern not found - no change\n");
    else process.stderr.write("[font-shim] applied\n");
    return mod._compile(patched, filename);
  }
  return orig(mod, filename);
};
