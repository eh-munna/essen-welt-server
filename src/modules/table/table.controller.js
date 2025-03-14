// * book a table

import { asyncTryCatch } from '../../utils/asyncTryCatch.js';
import { createTable } from './table.service.js';

const handleCreateTable = asyncTryCatch(async (req, res) => {
  const table = await createTable(req.body);
  res.status(201).json({
    success: true,
    message: 'Table created successfully',
    data: table,
  });
});

const bookTable = asyncTryCatch(async (req, res) => {});

export { bookTable, handleCreateTable };
