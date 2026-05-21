# Tests

## Running the tests

npx jest

## Test file: src/**tests**/auditEngine.test.ts

| #   | Test name                                                         | What it covers                               |
| --- | ----------------------------------------------------------------- | -------------------------------------------- |
| 1   | audit returns a result with auditId                               | Basic audit runs and returns valid structure |
| 2   | total monthly spend is sum of all tools                           | Spend calculation accuracy                   |
| 3   | annual savings equals monthly savings times 12                    | Savings math correctness                     |
| 4   | flags redundant coding tools when cursor and copilot both present | Overlap detection rule                       |
| 5   | flags team plan as overkill for less than 3 users                 | Team size mismatch rule                      |
| 6   | returns zero savings for already optimal spend                    | No false positives                           |
| 7   | summary is always a non-empty string                              | Summary generation never fails               |

## Results

All 7 tests pass. Run with npx jest --verbose to see individual results.
