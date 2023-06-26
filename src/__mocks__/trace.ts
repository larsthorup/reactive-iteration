type Trace = {
  count: number;
};
const traces: { [key: string]: Trace } = {};

export const countTrace = (tag: string) => {
  const trace = (traces[tag] ??= { count: 0 });
  trace.count++;
};

export const resetTraceCount = (tag: string): void => {
  traces[tag] = { count: 0 };
};

export const getTraceCount = (tag: string): number | undefined => {
  return traces[tag]?.count;
};
