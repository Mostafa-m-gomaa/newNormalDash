import { useContext } from "react";
import { AppContext } from "../App";
import { useState } from "react";
import toast from "react-hot-toast";

const ShowInvoice = ({ data }) => {
  const { setOnload, route } = useContext(AppContext);
  const token = localStorage.getItem("token");
  const [paying, setPaying] = useState(false);
  const handelAction = function () {
    setOnload(true);
    fetch(`${route}/withdrawReq/payToMarketer/${data?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Payment done!");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setOnload(false);
      });
  };
  return (
    <div
      style={{
        direction: "rtl",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        border: "1px solid gray",
        margin: "10px",
        borderRadius: "10px",
      }}
    >
      <div>
        <span>اجمالي مبلغ المبيعات</span>: <span>{data?.totalSalesMoney}</span>
      </div>
      <div>
        <span>المبيعات المباشره</span>: <span>{data?.mySales}</span>
      </div>
      <div>
        <span>مبيعات المكتسبة</span>: <span>{data?.customerSales}</span>
      </div>
      <div>
        <span>الارباح من العملاء</span>: <span>{data?.customers_profits}</span>
      </div>
      <div>
        <span>النسبة</span>
        <span>{data?.percentage}</span>
      </div>
      <div>
        <span>أرباحي</span>
        <span>{data?.direct_profits}</span>
      </div>
      <div>
        <span>ارباح الشجره</span>
        <span>{data?.tree_profits}</span>
      </div>
      <div>
        <span>الارباح الكلية</span>
        <span> {data?.tree_profits + data?.direct_profits}</span>
      </div>

      <div>
        <span>طريقة الاستلام</span> : <span>{data?.paymentMethod}</span>
      </div>
      <div>
        <span>حساب الاستلام</span> : <span>{data?.recieverAcc}</span>
      </div>
      <div>
        <span>حاله الطلب </span> : <span>{data?.status}</span>
      </div>
      {paying && (
        <p style={{ textAlign: "center" }}>
          Are you sure that you want to pay this
        </p>
      )}
      <div className="pay">
        {!paying && (
          <button
            type="button"
            onClick={() => setPaying(true)}
            className="trigger"
          >
            Pay
          </button>
        )}
        {paying && (
          <>
            <button type="button" className="trigger" onClick={handelAction}>
              yes
            </button>
            <button
              type="button"
              className="trigger"
              onClick={() => setPaying(false)}
            >
              no
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ShowInvoice;
