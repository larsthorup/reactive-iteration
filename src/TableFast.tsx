import { ReactElement } from "react";

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
interface TableFastProps<TRow extends TRowConstraint> {
  rowIds: string[];
  useRow: (id: string) => TRow;
  columns: TableColumn<TRow>[];
}

function TableFast<TRow extends TRowConstraint>({
  rowIds,
  useRow,
  columns,
}: TableFastProps<TRow>) {
  return (
    <table>
      <tbody>
        {rowIds.map((rowId) => (
          <TableFastRow key={rowId} rowId={rowId} useRow={useRow} columns={columns} />
        ))}
      </tbody>
    </table>
  );
}

interface TableFastRowProps<TRow extends TRowConstraint> {
  rowId: string;
  useRow: (id: string) => TRow;
  columns: TableColumn<TRow>[];
}
function TableFastRow<TRow extends TRowConstraint>({
  rowId,
  useRow,
  columns,
}: TableFastRowProps<TRow>) {
  const row = useRow(rowId);
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

export default TableFast;
