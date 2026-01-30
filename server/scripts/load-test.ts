// Simple native load test script intended to be run with ts-node
// Usage: npx ts-node scripts/load-test.ts

const BASE_URL = "http://localhost:3000/api";
const CONCURRENCY = 10;
const TOTAL_REQUESTS = 50;

async function runLoadTest() {
  console.log(
    `Starting Load Test: ${TOTAL_REQUESTS} requests, ${CONCURRENCY} concurrency`,
  );
  const start = Date.now();
  let completed = 0;
  let errors = 0;

  const worker = async (id: number) => {
    while (completed < TOTAL_REQUESTS) {
      // Simple synthetic load - just hitting health or auth would be better if we don't have tokens
      // For this test, we'll try to hit the health endpoint (if it existed) or just auth failure
      // To properly test payroll, we'd need to login first.
      // Letting this fail on 401 is enough to test network/server throughput throughput.
      try {
        const res = await fetch(`${BASE_URL}/payroll/draft`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        if (res.status >= 500) errors++;
      } catch (e) {
        errors++;
      }
      completed++;
      if (completed % 10 === 0) console.log(`Completed: ${completed}`);
    }
  };

  const workers = Array(CONCURRENCY)
    .fill(null)
    .map((_, i) => worker(i));
  await Promise.all(workers);

  const duration = (Date.now() - start) / 1000;
  console.log(`\nTest Complete in ${duration}s`);
  console.log(`RPS: ${TOTAL_REQUESTS / duration}`);
  console.log(`Errors: ${errors}`);
}

runLoadTest();
