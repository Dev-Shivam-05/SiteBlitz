import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { connect, createServer } from "node:net";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";

/**
 * A throwaway mongod for tests: the same cached binary the E2E notes in CLAUDE.md use, on a fresh temp dbpath and a
 * free port, bound to 127.0.0.1. Tests can therefore never reach the production database: the URI is built here and
 * always points at this local process. Set MONGOD_BINARY to use another mongod build.
 */

export function mongodBinary(): string | null {
  if (process.env.MONGOD_BINARY && existsSync(process.env.MONGOD_BINARY)) return process.env.MONGOD_BINARY;
  const dir = join(homedir(), ".cache", "mongodb-binaries");
  if (!existsSync(dir)) return null;
  const found = readdirSync(dir).find((f) => /^mongod.*(\.exe)?$/.test(f));
  return found ? join(dir, found) : null;
}

function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const srv = createServer();
    srv.once("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const port = (srv.address() as { port: number }).port;
      srv.close(() => resolve(port));
    });
  });
}

function portOpen(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const s = connect(port, "127.0.0.1");
    s.once("connect", () => {
      s.destroy();
      resolve(true);
    });
    s.once("error", () => resolve(false));
  });
}

export interface ScratchMongo {
  uri: string;
  stop(): Promise<void>;
}

export async function startScratchMongo(): Promise<ScratchMongo> {
  const bin = mongodBinary();
  if (!bin) throw new Error("no mongod binary (set MONGOD_BINARY)");
  const dbpath = mkdtempSync(join(tmpdir(), "sb-outreach-test-"));
  const port = await freePort();
  const child = spawn(bin, ["--dbpath", dbpath, "--port", String(port), "--bind_ip", "127.0.0.1", "--quiet"], {
    stdio: "ignore",
    windowsHide: true,
  });
  let exited = false;
  child.once("exit", () => (exited = true));

  const deadline = Date.now() + 45_000;
  while (!(await portOpen(port))) {
    if (exited) throw new Error("mongod exited during start-up");
    if (Date.now() > deadline) {
      child.kill();
      throw new Error("mongod did not start within 45 s");
    }
    await new Promise((r) => setTimeout(r, 200));
  }

  return {
    uri: `mongodb://127.0.0.1:${port}`,
    async stop() {
      if (!exited) {
        const gone = new Promise((r) => child.once("exit", r));
        child.kill();
        await gone;
      }
      rmSync(dbpath, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    },
  };
}
