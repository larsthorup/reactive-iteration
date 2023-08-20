function useProduct(id) {
  return useSelector((state) => state.stock[id]);
}

function ProductTable() {
  const stock = useSelector((state) => state.stock);
  const ids = Object.keys(stock);
  const columns = [...]; // same as above
  return (
      <Table useRow={useProduct} {...{ids, columns}} />
  );
}

function Table({ rowIds, useRow, columns }) {
  return (
    <table>
      <tbody>
        {rowIds.map((rowId) => (
          <TableRow key={rowId} {...{rowIds, useRow, columns}} />
        ))}
      </tbody>
    </table>
  );
}

function TableRow({ rowId, useRow, columns }) {
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

