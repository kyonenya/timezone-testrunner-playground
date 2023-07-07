import { add } from "../add";
import test from "node:test";
import assert from "node:assert";

import { equal } from "node:assert/strict";
import { describe, it } from "node:test";

/**
 * @see [Node.js の標準 API にテストランナーが追加された](https://azukiazusa.dev/blog/node-js-api/)
 */
test("test:add", (t) => {
  t.test("adds 1 + 2 to equal 3", () => {
    assert.strictEqual(add(1, 2), 3);
  });
});

/**
 * @see [node-test-with-typescript/tests/add.test.ts at main · scottwillmoore/node-test-with-typescript · GitHub](https://github.com/scottwillmoore/node-test-with-typescript/blob/main/tests/add.test.ts)
 */
describe("describe:add", () => {
  it("1 + 2 = 3", () => {
    equal(add(1, 2), 3);
  });
  it("2 + 5 = 7", () => {
    equal(add(2, 5), 7);
  });
});
