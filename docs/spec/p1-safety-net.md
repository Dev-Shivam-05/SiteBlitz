# SPEC LOCK — P1 Safety Net

Approved 2026-08-20. Built 2026-08-20.

The repo had zero tests and no linter. This suite does not chase coverage — it covers the two
places where a silent regression is a security incident rather than a cosmetic bug (see
`docs/DECISIONS.md` D2).

## Locked values

| # | Decision | Locked value |
|---|---|---|
| 1 | Test runner | `vitest` ^3 (only new devDep), `vitest.config.ts` with the `@/*` alias mirroring tsconfig. Scripts `test` → `vitest run`, `test:watch` → `vitest` |
| 2 | Test location | `tests/*.test.ts` at repo root — leaves `src/` untouched |
| 3 | Grader internals | `isPrivateIp`, `normalizeInput`, `validatePublicUrl` exported with `/** @internal — exported for tests */`. No logic change |
| 4 | Private-IP cases | 21 rejected: loopback, 0/8, 10/8, 172.16/12 (low+high), 192.168/16, 169.254 metadata + link-local, CGNAT, 192.0.0/24, 198.18 benchmarking, multicast, reserved, `::`, `::1`, `fe80::`, `fc00::`, `fd00::`, `ff02::`, v4-mapped loopback + private |
| 5 | Public-IP cases | 4 allowed: `8.8.8.8`, `1.1.1.1`, `93.184.216.34`, `2001:4860:4860::8888` |
| 6 | URL cases (no DNS) | 14 rejected: ftp/file/javascript/data schemes, `localhost` (+port), `.local`, `.internal`, dotless host, unparseable, literal loopback/private/metadata/v6-loopback |
| 7 | Auth gate approach | Call `middleware(req)` directly with a constructed `NextRequest` and `JWT_SECRET` set in-process. No server, no network |
| 8 | Auth cases | Redirect with `?next=` preserved, login-page bounce, unauthenticated login page served, and 401 for garbage / empty / expired / wrong-secret / non-admin-role tokens |
| 9 | Admin route coverage | All 13 `/api/admin/*` routes parametrized; `login` and `logout` asserted to pass through |

## Out of scope
CI, UI/component tests, end-to-end `gradeWebsite` (needs network), removing `ignoreBuildErrors` (P5),
any behaviour change to grader or middleware.

## Verification record (2026-08-20)

| Criterion | Result |
|---|---|
| `npm test` exits 0 | Pass — **73 tests, 2 files** |
| ≥33 assertions | Pass — 73 |
| Removing `isPrivateIp`'s `169.254` guard fails the suite | **Pass — 3 failures**, incl. the cloud-metadata case |
| Removing the `/api/admin` gate fails the suite | **Pass — 18 failures** |
| `npm run build` still exits 0 | Pass |
| Only source diff is 3 `export` keywords | Pass — `middleware.ts` byte-identical to HEAD |

Both mutations were applied, observed to fail, and reverted. A suite that cannot detect the
regression it exists to catch is worse than no suite, so this check is mandatory if the cases change.
