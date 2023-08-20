function Products() {
  const stock = useAppSelector((state) => state.stock);
  const rows = Object.values(stock);
  const columns = [
    { name: "name", Cell: ({ row }) => <>{row.name}</> },
    {
      name: "quantity",
      Cell: function ({ row }) {
        const { id, quantity } = row;
        const dispatch = useAppDispatch();
        const onClick = () => { 
          dispatch(increment({ id }));
        };
        return <button onClick={onClick}>{quantity}</button>;
      },
    },
  ];
  return (
      <Table rows={rows} columns={columns} />
  );
}


