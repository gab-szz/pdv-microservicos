import { z } from 'zod';

declare const idSchema: z.ZodObject<{
    id: z.ZodCoercedNumber<unknown>;
}, z.core.$strip>;

export { idSchema };
