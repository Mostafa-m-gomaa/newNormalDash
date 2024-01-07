import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../App";
import toast from "react-hot-toast";
import InvoicesTable from "./InvoicesTable";
import SalesTable from "./SalesTable";

const MarketLog = () => {
  const { route, setOnload } = useContext(AppContext);
  const token = localStorage.getItem("token");
  const [marketData, setMarketData] = useState({});
  const id = useParams().id;
  useEffect(() => {
    setOnload(true);
    fetch(`${route}/marketing/getMarketLog/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.msg) {
          toast.error(res.msg);
        }
        setMarketData(res.marketLog);
        setOnload(false);
      });
  }, []);
  return (
    <div className="main-sec">
      <h2>{marketData?.marketer?.email}</h2>
      <div>
        <h4>
          الدور : <span>{marketData?.role}</span>
        </h4>{" "}
        <h4>
          إجمالي المبيعات : <span>${marketData?.totalSalesMoney}</span>
        </h4>{" "}
        <h4>
          عدد المبيعات: <span>{marketData?.mySales}</span>
        </h4>{" "}
        <h4>
          المبيعات المكتسبة : <span>{marketData?.customerSales}</span>
        </h4>{" "}
        <h4>
          الارباح من العملاء: <span>${marketData?.customers_profits}</span>
        </h4>{" "}
        <h4>
          النسبه: <span>%{marketData?.percentage}</span>
        </h4>
        <h4>
          الربح: <span>${marketData?.profits}</span>
        </h4>
      </div>

      {marketData?.invitor?._id && (
        <p className="text-xs">
          تمت دعوته بواسطه : {marketData?.invitor?.email}
        </p>
      )}

      <div className="space-y-4">
        <h2 className="font-semibold text-center text-xl">فواتيره </h2>
        {marketData?.invoices?.length === 0 ? (
          <p className="my-10 font-semibold text-center">لا يوجد فواتير هنا</p>
        ) : (
          <InvoicesTable data={marketData?.invoices} />
        )}
      </div>
      <div className="space-y-4">
        <h2 className="font-semibold text-center text-xl">المبيعات المباشرة</h2>
        {marketData?.direct_transactions?.length === 0 ? (
          <p className="my-10 font-semibold text-center">لا يوجد مبيعات هنا</p>
        ) : (
          <SalesTable data={marketData?.direct_transactions} />
        )}
      </div>
      <div className="space-y-4">
        <h2 className="font-semibold text-center text-xl">
          الارباح من الفريق{" "}
        </h2>
        {marketData?.transactions?.length === 0 ? (
          <p className="my-10 font-semibold text-center">لا يوجد ارباح هنا</p>
        ) : (
          <SalesTable data={marketData?.transactions} haveGeneration={true} />
        )}
      </div>
    </div>
  );
};

export default MarketLog;
