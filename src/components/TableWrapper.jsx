const TableWrapper = ({ children }) => {
  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      {children}
    </div>
  );
};

export default TableWrapper;