import { z } from 'zod';

const tableCreateSchema = z.object({
  tableNumber: z
    .number({
      invalid_type_error: 'Table number must be number',
    })
    .int(),
  capacity: z
    .number({
      invalid_type_error: 'Capacity must be number',
    })
    .min(2, { message: 'Capacity must be at least 2' }),
});

export { tableCreateSchema };
