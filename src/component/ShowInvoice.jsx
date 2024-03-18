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
        if(data.errors){
          toast.error("Error");
        }
        else{

          toast.success("Payment done!");
        }
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
      
      
        <h4>
        اجمالي المبيعات فوق 500 <span>${data?.totalSalesMoneyGT500}</span>
        </h4>{" "}
        <h4>
        اجمالي مبيعات تحت 500 <span>{data?.totalSalesMoneyLT500}</span>
        </h4>{" "}
        <h4>
        نسبة الربح فوق 500 : <span>{data?.percentageGT500}</span>
        </h4>{" "}
        <h4>
        نسبة الربح تحت 500: <span>${data?.percentageLT500}</span>
        </h4>{" "}
        <h4>
        اجمالي الربح فوق 500: <span>%{data?.profitsGT500}</span>
        </h4>
        <h4>
        اجمالي الربح تحت 500: <span>${data?.profitsLT500}</span>
        </h4>
      
      
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
