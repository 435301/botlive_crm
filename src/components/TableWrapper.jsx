const TableWrapper = ({ children }) => {
  return (
    <div  className="table-scroll-wrapper" style={{
      width: "100%", maxHeight: "400px",
      overflow: "auto", WebkitOverflowScrolling: "touch"
    }}>
      {children}
    </div>
  );
};

export default TableWrapper;