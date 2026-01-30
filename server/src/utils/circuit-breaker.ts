export enum CircuitState {
  CLOSED = "CLOSED",
  OPEN = "OPEN",
  HALF_OPEN = "HALF_OPEN",
}

interface CircuitBreakerOptions {
  failureThreshold: number;
  resetTimeout: number;
}

export class CircuitBreaker {
  public state: CircuitState = CircuitState.CLOSED;
  private failures = 0;
  private nextAttempt = Date.now();
  private readonly failureThreshold: number;
  private readonly resetTimeout: number;

  constructor(options: CircuitBreakerOptions) {
    this.failureThreshold = options.failureThreshold;
    this.resetTimeout = options.resetTimeout;
  }

  async execute<T>(action: () => Promise<T>): Promise<T> {
    if (this.state === CircuitState.OPEN) {
      if (Date.now() > this.nextAttempt) {
        this.state = CircuitState.HALF_OPEN;
      } else {
        throw new Error("Circuit is OPEN");
      }
    }

    try {
      const result = await action();
      this.success();
      return result;
    } catch (error) {
      this.failure();
      throw error;
    }
  }

  private success() {
    this.failures = 0;
    this.state = CircuitState.CLOSED;
  }

  private failure() {
    this.failures++;
    if (this.failures >= this.failureThreshold) {
      this.state = CircuitState.OPEN;
      this.nextAttempt = Date.now() + this.resetTimeout;
    }
  }
}
