import assert from "node:assert/strict";
import test from "node:test";
import { batchProcess, batchProcessWithSSE } from "../src/batch/utils.ts";

const options = { retries: 2, minTimeout: 1, maxTimeout: 1 };

test("batch preserves non-retryable errors and stops after one attempt", async () => {
  const failure = new Error("Invalid input");
  let attempts = 0;
  await assert.rejects(
    batchProcess([1], async () => { attempts++; throw failure; }, options),
    (error) => error === failure,
  );
  assert.equal(attempts, 1);
});

test("batch retries rate limits and reports progress only on success", async () => {
  let attempts = 0;
  const progress: number[] = [];
  const results = await batchProcess([1], async () => {
    if (++attempts === 1) throw new Error("429 rate limit");
    return "done";
  }, { ...options, onProgress: (completed) => progress.push(completed) });
  assert.deepEqual(results, ["done"]);
  assert.equal(attempts, 2);
  assert.deepEqual(progress, [1]);
});

test("SSE retries rate limits using the error inside the retry context", async () => {
  let attempts = 0;
  const events: Array<{ type: string; [key: string]: unknown }> = [];
  const results = await batchProcessWithSSE([1], async () => {
    if (++attempts === 1) throw new Error("429 rate limit");
    return "done";
  }, (event) => events.push(event), options);
  assert.deepEqual(results, ["done"]);
  assert.equal(attempts, 2);
  assert.deepEqual(events.at(-1), { type: "complete", processed: 1, errors: 0 });
});

test("SSE reports the original non-retryable error and continues later items", async () => {
  let attempts = 0;
  const events: Array<{ type: string; [key: string]: unknown }> = [];
  const results = await batchProcessWithSSE([1, 2], async (item) => {
    attempts++;
    if (item === 1) throw new Error("Invalid input");
    return "done";
  }, (event) => events.push(event), options);
  assert.deepEqual(results, [undefined, "done"]);
  assert.equal(attempts, 2);
  assert.equal(events.find((event) => event.error)?.error, "Invalid input");
  assert.deepEqual(events.at(-1), { type: "complete", processed: 2, errors: 1 });
});
