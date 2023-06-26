// Note: for use in tests, see __mocks__/trace.ts

export const countTrace: (tag: string) => void = () => {
  // this is deliberately a no-op in production
};

export const resetTraceCount: (tag: string) => void = () => {};

export const getTraceCount: (tag: string) => number | undefined = () => undefined;
