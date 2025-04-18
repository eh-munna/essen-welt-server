import { z } from 'zod';

const bookingCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  numberOfPeople: z.number().min(1, 'At least one person is required'),
  date: z.coerce.date({ required_error: 'Date is required' }),
  startTime: z.coerce.date({ required_error: 'Start time is required' }),
  endTime: z.coerce.date({ required_error: 'End time is required' }),
  message: z.string().optional(),

  tableId: z
    .array(z.string().min(1, 'Table ID is required'))
    .nonempty('At least one table ID is required'),

  tableNumber: z.array(z.number()).optional(),
});

export { bookingCreateSchema };
