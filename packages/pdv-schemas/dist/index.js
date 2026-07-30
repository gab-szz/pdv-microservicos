// src/id-schema.ts
import { z } from "zod";
var idSchema = z.object({
  id: z.coerce.number()
});
export {
  idSchema
};
