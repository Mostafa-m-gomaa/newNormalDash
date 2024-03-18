// const InvoicesTable = ({ data }) => {
//   return (
//     <>
//       <div style={{ maxWidth: "100%", overflow: "auto", width: "100%" }}>
//         <table className="text-center w-full my-6">
//           <thead>
//             <tr>
//               <th style={{ color: "white", padding: "10px" }}>
//                 اجمالي مبلغ المبيعات
//               </th>
//               <th style={{ color: "white", padding: "10px" }}>
//                 المبيعات المباشره
//               </th>
//               <th style={{ color: "white", padding: "10px" }}>
//                 مبيعات المكتسبة
//               </th>
//               <th style={{ color: "white", padding: "10px" }}>النسبة</th>
//               <th style={{ color: "white", padding: "10px" }}>أرباحي</th>
//               <th style={{ color: "white", padding: "10px" }}>ارباح الشجره</th>
//               <th style={{ color: "white", padding: "10px" }}>
//                 الارباح من العملاء
//               </th>
//               <th style={{ color: "white", padding: "10px" }}>
//                 الارباح الكلية
//               </th>
//               <th style={{ color: "white", padding: "10px" }}>حالة الفاتوره</th>
//               <th style={{ color: "white", padding: "10px" }}>التاريخ</th>
//               <th style={{ color: "white", padding: "10px" }}>تاريخ الدفع</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data?.map((item) => (
//               <tr key={item._id}>
//                 <td className=" border border-gray p-2">
//                   ${item.totalSalesMoney}
//                 </td>
//                 <td className=" border border-gray p-2">{item.mySales}</td>
//                 <td className=" border border-gray p-2">
//                   ${item.customerSales}
//                 </td>
//                 <td className=" border border-gray p-2">%{item.percentage}</td>
//                 <td className=" border border-gray p-2">
//                   ${item.direct_profits}
//                 </td>
//                 <td className=" border border-gray p-2">
//                   ${item.tree_profits}
//                 </td>
//                 <td className=" border border-gray p-2">
//                   ${item.customers_profits}
//                 </td>
//                 <td className=" border border-gray p-2">
//                   $
//                   {item.tree_profits +
//                     item.direct_profits +
//                     item.customers_profits}
//                 </td>
//                 <td className=" border border-gray p-2 whitespace-nowrap">
//                   {item.status === "paid" && "تم الدفع"}
//                   {item.status === "pending" && "يتم المراجعة"}
//                   {item.status === "rejected" && "مرفوض"}
//                   {item.status === "unpaid" && "غير مدفوع"}
//                 </td>

//                 <td className=" border border-gray p-2">
//                   {new Date(item.Date).toLocaleDateString()}
//                 </td>
//                 <td className=" border border-gray p-2">
//                   {item?.paidAt ? (
//                     <>{new Date(item.paidAt).toLocaleDateString()}</>
//                   ) : (
//                     "-"
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default InvoicesTable;
import { useContext, useState } from "react";
import { AppContext} from "../../App";
import toast from "react-hot-toast";
import axios from "axios";

const InvoicesTable = ({ data, getData }) => {
  const token = localStorage.getItem("token");
  const { setLoading ,route} = useContext(AppContext);
  const [reqInvoice, setReqInvoice] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [email, setEmail] = useState("");
  const sendRequest = function (e) {
    e.preventDefault();

    setLoading(true);
    axios
      .post(
        `${route}withdrawReq`,
        JSON.stringify({
          paymentMethod,
          recieverAcc: email,
          invoiceId: reqInvoice._id,
        }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        toast.success("Done");
        setReqInvoice({});
        getData();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {reqInvoice?._id && (
        <div className="fixed w-full h-full right-0 top-0 bg-[black] bg-opacity-75 flex items-center justify-center">
          <div className="bg-blackGold p-6 rounded-xl">
            {" "}
            <div className="font-semibold text-xl flex items-center justify-between mb-4">
              <h2>إتمام طلب السحب</h2>
              <button onClick={() => setReqInvoice({})}>
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            </div>
            <form className="space-y-4" onSubmit={(e) => sendRequest(e)}>
              <div className="space-y-2 ">
                <label>طريقه الحصول علي العمولات :</label>
                <select
                  required
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className=" w-full py-2 bg-blackGold border border-goldenGray px-6  rounded-md"
                >
                  <option value="" disabled selected></option>
                  <option value="wise">wise</option>
                  <option value="crypto">crypto</option>
                </select>
              </div>
              {paymentMethod && (
                <div className="space-y-2">
                  <label>
                    {paymentMethod === "crypto" && "عنوان المحفظه"}
                    {paymentMethod === "wise" && "البريد الالكتروني"} :
                  </label>
                  <input
                    type="text"
                    placeholder="example"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className=" w-full py-2 bg-blackGold border border-goldenGray px-6  rounded-md"
                  />
                </div>
              )}

              <button
                type="submit"
                className="font-semibold text-blackGold bg-gold px-10 py-2 rounded-xl mx-auto block w-fit"
              >
                سجل
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="max-w-full overflow-auto w-full">
        <table className="text-center w-full my-6">
          <thead>
            <tr>
              <th className=" border border-gray p-2 " style={{
                color: "white"
              }}>اجمالي المبيعات فوق 500</th>
              <th style={{
                color: "white"
              }} className=" border border-gray p-2">اجمالي مبيعات تحت 500</th>
              <th style={{
                color: "white"
              }} className=" border border-gray p-2">نسبة الربح فوق 500</th>
              <th style={{
                color: "white"
              }} className=" border border-gray p-2">نسبة الربح تحت 500</th>
              <th style={{
                color: "white"
              }} className=" border border-gray p-2">اجمالي الربح فوق 500</th>
              <th style={{
                color: "white"
              }} className=" border border-gray p-2">اجمالي الربح تحت 500</th>
              {/* <th className=" border border-gray p-2">الأرباح من العملاء</th> */}
              {/* <th className=" border border-gray p-2">الارباح الكلية</th> */}
              <th style={{
                color: "white"
              }} className=" border border-gray p-2">الوصف</th>
              <th style={{
                color: "white"
              }} className=" border border-gray p-2">الحالة</th>
              <th style={{
                color: "white"
              }} className=" border border-gray p-2">تاريخ الانشاء</th>
              <th style={{
                color: "white"
              }} className=" border border-gray p-2">تاريخ الدفع</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item._id}>
                <td className=" border border-gray p-2">
                  ${item.totalSalesMoneyGT500}
                </td>
              
                <td className=" border border-gray p-2">
                  ${item.totalSalesMoneyLT500}
                </td>
              
                <td className=" border border-gray p-2">
                  %{item.percentageGT500}
                </td>
                <td className=" border border-gray p-2">
                  %{item.percentageLT500}
                </td>
                <td className=" border border-gray p-2">
                  ${item.profitsGT500}
                </td>
                <td className=" border border-gray p-2">
                  $
                  {item.profitsLT500}
                </td>
                <td className=" border border-gray p-2">
                  {item.desc}
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
            {data?.length === 0 && (
              <tr>
                <td className=" border border-gray p-2">-</td>
                <td className=" border border-gray p-2">-</td>
                <td className=" border border-gray p-2">-</td>
                <td className=" border border-gray p-2">-</td>
                <td className=" border border-gray p-2">-</td>
                <td className=" border border-gray p-2">-</td>
                <td className=" border border-gray p-2">-</td>
                <td className=" border border-gray p-2 whitespace-nowrap">-</td>

                <td className=" border border-gray p-2">-</td>
                <td className=" border border-gray p-2">-</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InvoicesTable;
