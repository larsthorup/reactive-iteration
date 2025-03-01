import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Note: make the store have a small subset of products
// so that tests are not too slow
vi.stubEnv('NODE_ENV', 'test')