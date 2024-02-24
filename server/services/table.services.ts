import { TableModel } from '../database/models';
import { TableProps } from '../interfaces';
import { AppError } from '../models';
import { encrypt } from '../utils';

class TableService {
  constructor() {}

  async findTablesForBar(barId: number) {
    const tables = await TableModel.findAll({
      where: {
        barId,
      },
    });
    return tables;
  }

  async createTableForBar({
    tableNumber,
    ability,
    location,
    barId,
  }: TableProps) {
    const table = await TableModel.create({
      tableNumber,
      ability,
      location,
      barId,
    });
    return table;
  }
  async updateTableForBar(
    tableId: number,
    { ability, isOccupied, location, tableNumber, barId }: TableProps
  ) {
    const table = await TableModel.findOne({
      where: {
        id: tableId,
        barId,
      },
    });
    if (!table)
      throw new AppError(
        'No se encontró ninguna en el bar con el ID especificado.',
        404
      );
    table.update({ ability, isOccupied, location, tableNumber });
    return table;
  }
  async removeTableForBar(tableId: number, barId: number) {
    const table = await TableModel.findOne({
      where: {
        id: tableId,
        barId,
      },
    });
    if (!table)
      throw new AppError(
        'No se encontró ninguna mesa en el bar con el ID especificado.',
        404
      );
    table.destroy();
    return table;
  }
}

export default TableService;
