/**
 * Simple Load Test Script
 *
 * Usage: node scripts/load-test.js
 *
 * Simulates concurrent requests to the backend to verify stability.
 */

const API_URL = "http://localhost:3000/api";
const CONCURRENT_REQUESTS = 20;
const TOTAL_REQUESTS = 100;

async function runLoadTest() {
  console.log(`Starting load test against ${API_URL}`);
  console.log(`Concurrent: ${CONCURRENT_REQUESTS}, Total: ${TOTAL_REQUESTS}`);

  let completed = 0;
  let success = 0;
  let failed = 0;
  const start = Date.now();

  const requests = [];

  for (let i = 0; i < TOTAL_REQUESTS; i++) {
    // Basic health check or public endpoint simulation
    // Since we don't have auth token easily here, we hit a public endpoint or expect 401 (which still tests server load handling)
    const p = fetch(`${API_URL}/health`)
      .then((res) => {
        // We consider 200 or 401/403 as "server handled it", 500 or network error is failure
        if (res.status < 500) return true;
        throw new Error(`Status ${res.status}`);
      })
      .then(() => success++)
      .catch((e) => failed++)
      .finally(() => {
        completed++;
        process.stdout.write(
          `\rProgress: ${completed}/${TOTAL_REQUESTS} (Success: ${success}, Failed: ${failed})`,
        );
      });

    requests.push(p);

    // Batch control
    if (requests.length >= CONCURRENT_REQUESTS) {
      await Promise.race(requests);
      // This roughly limits concurrency but for a simple script it's fine
    }
  }

  await Promise.all(requests);
  const duration = (Date.now() - start) / 1000;

  console.log("\n\nTest Complete!");
  console.log(`Duration: ${duration.toFixed(2)}s`);
  console.log(`RPS: ${(TOTAL_REQUESTS / duration).toFixed(2)}`);
  console.log(
    `Success Rate: ${((success / TOTAL_REQUESTS) * 100).toFixed(1)}%`,
  );
}

runLoadTest();
