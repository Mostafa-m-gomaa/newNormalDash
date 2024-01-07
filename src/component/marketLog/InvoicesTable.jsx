const InvoicesTable = ({ data }) => {
  return (
    <>
      <div style={{ maxWidth: "100%", overflow: "auto", width: "100%" }}>
        <table className="text-center w-full my-6">
          <thead>
            <tr>
              <th style={{ color: "white", padding: "10px" }}>
                اجمالي مبلغ المبيعات
              </th>
              <th style={{ color: "white", padding: "10px" }}>
                المبيعات المباشره
              </th>
              <th style={{ color: "white", padding: "10px" }}>
                مبيعات المكتسبة
              </th>
              <th style={{ color: "white", padding: "10px" }}>النسبة</th>
              <th style={{ color: "white", padding: "10px" }}>أرباحي</th>
              <th style={{ color: "white", padding: "10px" }}>ارباح الشجره</th>
              <th style={{ color: "white", padding: "10px" }}>
                الارباح من العملاء
              </th>
              <th style={{ color: "white", padding: "10px" }}>
                الارباح الكلية
              </th>
              <th style={{ color: "white", padding: "10px" }}>حالة الفاتوره</th>
              <th style={{ color: "white", padding: "10px" }}>التاريخ</th>
              <th style={{ color: "white", padding: "10px" }}>تاريخ الدفع</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item._id}>
                <td className=" border border-gray p-2">
                  ${item.totalSalesMoney}
                </td>
                <td className=" border border-gray p-2">{item.mySales}</td>
                <td className=" border border-gray p-2">
                  ${item.customerSales}
                </td>
                <td className=" border border-gray p-2">%{item.percentage}</td>
                <td className=" border border-gray p-2">
                  ${item.direct_profits}
                </td>
                <td className=" border border-gray p-2">
                  ${item.tree_profits}
                </td>
                <td className=" border border-gray p-2">
                  ${item.customers_profits}
                </td>
                <td className=" border border-gray p-2">
                  $
                  {item.tree_profits +
                    item.direct_profits +
                    item.customers_profits}
                </td>
                <td className=" border border-gray p-2 whitespace-nowrap">
                  {item.status === "paid" && "تم الدفع"}
                  {item.status === "pending" && "يتم المراجعة"}
                  {item.status === "rejected" && "مرفوض"}
                  {item.status === "unpaid" && "غير مدفوع"}
                </td>

                <td className=" border border-gray p-2">
                  {new Date(item.Date).toLocaleDateString()}
                </td>
                <td className=" border border-gray p-2">
                  {item?.paidAt ? (
                    <>{new Date(item.paidAt).toLocaleDateString()}</>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InvoicesTable;
