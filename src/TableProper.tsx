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
interface TableProperProps<TRow extends TRowConstraint> {
  rows: TRow[];
  columns: TableColumn<TRow>[];
}

function TableProper<TRow extends TRowConstraint>({
  rows,
  columns,
}: TableProperProps<TRow>) {
  return (
    <table>
      <tbody>
        {rows.map((row) => (
          <TableProperRowMemo key={row.id} row={row} columns={columns} />
        ))}
      </tbody>
    </table>
  );
}

interface TableProperRowProps<TRow extends TRowConstraint> {
  row: TRow;
  columns: TableColumn<TRow>[];
}
export function TableProperRow<TRow extends TRowConstraint>({
  row,
  columns,
}: TableProperRowProps<TRow>) {
  countTrace(TableProperRow.name);
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
}
const TableProperRowMemo = React.memo(TableProperRow);

export default TableProper;
