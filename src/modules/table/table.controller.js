// * book a table

import { asyncTryCatch } from '../../utils/asyncTryCatch.js';
import {
  createTable,
  findAndDeleteTable,
  findAndUpdateTable,
  findTables,
} from './table.service.js';

const handleCreateTable = asyncTryCatch(async (req, res) => {
  const table = await createTable(req.body);
  res.status(201).json({
    success: true,
    message: 'Table created successfully',
    data: table,
  });
});

const getTables = asyncTryCatch(async (req, res) => {
  const tables = await findTables();
  res.status(200).json({
    success: true,
    message: 'Tables fetched successfully',
    data: tables,
  });
});

const deleteTable = asyncTryCatch(async (req, res) => {
  const { id } = req.params;
  const deletedCount = await findAndDeleteTable(id);

  res.status(200).json({
    success: true,
    message: `${deletedCount} table(s) deleted successfully`,
  });
});

const updateTable = asyncTryCatch(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const updatedTable = await findAndUpdateTable({ id, updates });

  res.status(200).json({
    success: true,
    message: 'Table updated successfully',
    data: updatedTable,
  });
});

export { deleteTable, getTables, handleCreateTable, updateTable };
