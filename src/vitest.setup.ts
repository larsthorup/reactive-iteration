import matchers from '@testing-library/jest-dom/matchers';
import { expect, vi } from 'vitest';

expect.extend(matchers);

// Note: make the store have a small subset of products
// so that tests are not too slow
vi.stubEnv('NODE_ENV', 'test')