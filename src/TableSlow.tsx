import { ReactElement } from "react";
import { countTrace } from "./trace";

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
interface TableSlowProps<TRow extends TRowConstraint> {
  rows: TRow[];
  columns: TableColumn<TRow>[];
}

function TableSlow<TRow extends TRowConstraint>({
  rows,
  columns,
}: TableSlowProps<TRow>) {
  return (
    <table>
      <tbody>
        {rows.map((row) => (
          <TableSlowRow key={row.id} row={row} columns={columns} />
        ))}
      </tbody>
    </table>
  );
}

interface TableSlowRowProps<TRow extends TRowConstraint> {
  row: TRow;
  columns: TableColumn<TRow>[];
}
export function TableSlowRow<TRow extends TRowConstraint>({
  row,
  columns,
}: TableSlowRowProps<TRow>) {
  countTrace(TableSlowRow.name);
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

export default TableSlow;
