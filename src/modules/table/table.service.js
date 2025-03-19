import AppError from '../../error/AppError.js';
import Booking from '../booking/booking.model.js';
import Table from './table.model.js';

const createTable = async (payload) => {
  const result = await Table.create(payload);
  return result;
};

// const findAvailableTable = async (numberOfPeople, startTime, endTime) => {
//   // Find available tables with sufficient capacity
//   const tables = await Table.find({
//     isAvailable: true,
//     // capacity: { $gte: numberOfPeople },
//     _id: {
//       $nin: await Booking.distinct('tableId', {
//         $or: [
//           {
//             startTime: { $lt: endTime }, // existing booking starts before the new booking's end time
//             endTime: { $gt: startTime }, // existing booking ends after the new booking's start time
//           },
//         ],
//       }),
//     },
//   }).sort({ capacity: -1 }); // Sort by ascending capacity to get the smallest tables first

//   const exactMatchTable = tables.find(
//     (table) => table?.capacity === numberOfPeople
//   );

//   if (exactMatchTable) {
//     return [exactMatchTable]; // If an exact match is found, return that table
//   }

//   // If no exact match, try to merge smaller tables
//   let mergedTables = [];
//   let totalCapacity = 0;

//   // Iterate over the available tables and merge them if necessary
//   for (const table of tables) {
//     mergedTables.push(table);
//     totalCapacity += table?.capacity;

//     if (totalCapacity >= numberOfPeople) {
//       return mergedTables; // Return the merged tables once they meet the required capacity
//     }
//   }

//   // If no suitable tables or merged tables found, return null
//   return null;
// };

const findBestTableCombination = (tables, numberOfPeople) => {
  let bestCombination = [];
  let bestCapacity = Infinity;

  const createMergedTables = (index, currentCombination, currentCapacity) => {
    if (currentCapacity >= numberOfPeople) {
      if (currentCapacity < bestCapacity) {
        bestCapacity = currentCapacity;
        bestCombination = [...currentCombination];
      }
      return;
    }

    for (let i = index; i < tables.length; i++) {
      createMergedTables(
        i + 1,
        [...currentCombination, tables[i]],
        currentCapacity + tables[i]?.capacity
      );
    }
  };

  createMergedTables(0, [], 0);

  return bestCombination.length > 0 ? bestCombination : null;
};

const findAvailableTable = async (numberOfPeople, startTime, endTime) => {
  // Fetch available tables
  const tables = await Table.find({
    isAvailable: true,
    _id: {
      $nin: await Booking.distinct('tableId', {
        $or: [{ startTime: { $lt: endTime }, endTime: { $gt: startTime } }],
      }),
    },
  }).sort({ capacity: 1 }); // Sort by ascending capacity (smallest first)

  if (!tables.length) return null;

  // **Find an exact match**
  const exactMatch = tables.find((table) => table.capacity === numberOfPeople);
  if (exactMatch) return [exactMatch];

  //**Find the smallest table that fits without merging**
  const biggerTable = tables.find((table) => table.capacity > numberOfPeople);
  if (biggerTable) return [biggerTable];

  //  **Merge tables optimally**
  const mergedTables = findBestTableCombination(tables, numberOfPeople);
  return mergedTables ? mergedTables : null;
};

const findTables = async () => {
  const tables = await Table.find({});
  return tables?.length > 0 ? tables : [];
};

const findAndDeleteTable = async (payload) => {
  console.log(payload);
  const deleteResult = await Table.deleteOne({ _id: payload });

  if (!deleteResult?.deletedCount) {
    throw new AppError(404, 'Table not found');
  }

  return deleteResult?.deletedCount;
};

const findAndUpdateTable = async (payload) => {
  const updateResult = await Table.findByIdAndUpdate(
    payload?.id,
    payload?.updates,
    { new: true }
  );

  if (!updateResult) {
    throw new AppError(404, 'Table not found');
  }

  return updateResult;
};

export {
  createTable,
  findAndDeleteTable,
  findAndUpdateTable,
  findAvailableTable,
  findTables,
};
