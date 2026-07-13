import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { env } from '../../config/env.js';

export const openRouterApi = createOpenRouter({
  apiKey: env.OPENROUTER_API_KEY,
});
