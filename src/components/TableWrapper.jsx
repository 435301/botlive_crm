const TableWrapper = ({ children }) => {
  return (
    <div style={{
      width: "100%", maxHeight: "500px",
      overflowX: "auto", WebkitOverflowScrolling: "touch"
    }}>
      {children}
    </div>
  );
};

export default TableWrapper;