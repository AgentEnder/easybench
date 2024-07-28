import {
  AggregateSuiteError,
  BenchmarkReporter,
  ErrorStrategy,
  SuiteReporter,
} from './api-types';
import { Benchmark } from './benchmark';
import { SuiteConsoleReporter } from './reporters/suite-console-reporter';
import { Result } from './results';
import { Variation } from './variation';

export interface SuiteOptions {
  reporter?: SuiteReporter;
}

export class Suite {
  private benchmarks: Benchmark[] = [];
  private variations: Variation[] = [];

  private reporter: SuiteReporter;
  private benchmarkReporter?: BenchmarkReporter;
  private errorStrategy: ErrorStrategy = ErrorStrategy.Continue;
  private shouldSetErrorStrategyOnBenchmarks = false;

  constructor(
    private name: string,
    options?: SuiteOptions,
  ) {
    this.name = name;
    this.benchmarks = [];
    this.reporter = options?.reporter || new SuiteConsoleReporter();
  }

  addBenchmark(benchmark: Benchmark) {
    this.benchmarks.push(benchmark);
    return this;
  }

  withVariation(variation: Variation) {
    this.variations.push(variation);
    return this;
  }

  withVariations(variations: Variation[]) {
    this.variations.push(...variations);
    return this;
  }

  withReporter(reporter: SuiteReporter) {
    this.reporter = reporter;
    return this;
  }

  withBenchmarkReporter(reporter: BenchmarkReporter) {
    this.benchmarkReporter = reporter;
    return this;
  }

  /**
   * Sets the error strategy for the suite and optionally for the benchmarks.
   * @param errorStrategy Determines what to do when an error occurs during a benchmark run. See {@link ErrorStrategy}
   * @param opts Options for the error strategy. If `shouldSetOnBenchmarks` is true, the error strategy will be set on all benchmarks in the suite.
   */
  withErrorStrategy(
    errorStrategy: ErrorStrategy,
    opts?: {
      shouldSetOnBenchmarks?: boolean;
    },
  ) {
    this.errorStrategy = errorStrategy;
    if (opts?.shouldSetOnBenchmarks) {
      this.shouldSetErrorStrategyOnBenchmarks = opts?.shouldSetOnBenchmarks;
    }
    return this;
  }

  async run() {
    const results: Record<string, Result[]> = {};
    for (const benchmark of this.benchmarks) {
      benchmark.withVariations(this.variations);
      if (this.benchmarkReporter) {
        benchmark.withReporter(this.benchmarkReporter);
      }
      if (this.shouldSetErrorStrategyOnBenchmarks) {
        benchmark.withErrorStrategy(this.errorStrategy);
      }
      results[benchmark.name] = await benchmark.run();
    }
    this.reporter.report(results);
    if (this.errorStrategy === ErrorStrategy.DelayedThrow) {
      const failedResults = Object.values(results).flatMap((r) =>
        r.filter((r) => r.failed),
      );
      if (failedResults.length > 0) {
        throw new AggregateSuiteError(results);
      }
    }
    return results;
  }
}
