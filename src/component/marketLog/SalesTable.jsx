const SalesTable = ({ data, haveGeneration }) => {
  return (
    <div style={{ maxWidth: "100%", overflow: "auto", width: "100%" }}>
      <table className="text-center w-full my-6">
        <thead>
          <tr>
            <th cstyle={{ color: "white", padding: "10px" }}>المبلغ</th>
            <th cstyle={{ color: "white", padding: "10px" }}>ايميل المشتري</th>
            {haveGeneration && (
              <th cstyle={{ color: "white", padding: "10px" }}>المستوي</th>
            )}
            <th cstyle={{ color: "white", padding: "10px" }}>التاريخ</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item._id}>
              <td className=" border border-gray p-2">${item.amount}</td>
              <td className=" border border-gray p-2">{item.childEmail}</td>
              {haveGeneration && (
                <td className=" border border-gray p-2">{item.generation}</td>
              )}
              <td className=" border border-gray p-2">
                {new Date(item.Date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
