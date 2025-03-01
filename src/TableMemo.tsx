import { ReactElement } from "react";
import { countTrace } from "./trace";
import React from "react";

type TRowConstraint = {
  id: string;
  [key: string]: unknown;
};
interface CellProps<TRow extends TRowConstraint> {
  row: TRow;
}
export interface TableColumn<TRow extends TRowConstraint> {
  name: string;
  Cell: (props: CellProps<TRow>) => ReactElement;
}
interface TableMemoProps<TRow extends TRowConstraint> {
  rows: TRow[];
  columns: TableColumn<TRow>[];
}

function TableMemo<TRow extends TRowConstraint>({
  rows,
  columns,
}: TableMemoProps<TRow>) {
  return (
    <table>
      <tbody>
        {rows.map((row) => (
          <TableMemoRow key={row.id} row={row} columns={columns} />
        ))}
      </tbody>
    </table>
  );
}

interface TableMemoRowProps<TRow extends TRowConstraint> {
  row: TRow;
  columns: TableColumn<TRow>[];
}
export const TableMemoRow = React.memo(<TRow extends TRowConstraint>({
  row,
  columns,
}: TableMemoRowProps<TRow>) => {
  countTrace(TableMemoRow.name);
  return (
    <tr key={row.id}>
      {columns.map((column) => {
        const { Cell, name } = column;
        return (
          <td key={name}>
            <Cell row={row} />
          </td>
        );
      })}
    </tr>
  );
}) as <TRow extends TRowConstraint>(props: TableMemoRowProps<TRow>) => ReactElement;

export default TableMemo;
