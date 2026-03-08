declare global {
  namespace App {
    interface Platform {
      env: Record<string, unknown>;
      context: ExecutionContext;
    }
  }
}

export {};
