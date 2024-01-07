import React from "react";
import "./login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../App";
import toast from "react-hot-toast";

const Login = () => {
  const history = useNavigate();
  const { onload, setOnload } = useContext(AppContext);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const { showError, setShowError } = useContext(AppContext);
  const { login, setLogin } = useContext(AppContext);
  const { route, setRoute } = useContext(AppContext);
  const { displayMessage } = useContext(AppContext);
  const handleMail = (e) => {
    setMail(e.target.value);
  };
  const handlePass = (e) => {
    setPassword(e.target.value);
  };
  //   const handleLogin =async (e)=>{
  //     e.preventDefault()
  //     setOnload(true)

  //     const formData =new FormData()

  //     formData.append('email',mail)
  //     formData.append('password',password)

  //     try{
  //         const response = await  fetch("https://api3.sdcbm.com/api/login" ,{
  //             method:'POST',
  //             body:formData
  //         })
  //         .then(res=>res.json());
  //         if(response.status=="Success"){
  //             setOnload(false)
  //             // console.log(response)
  //             setLogin(true)
  //             localStorage.setItem("token",response.token)
  //             localStorage.setItem("login",true)
  //             localStorage.setItem("userName",response.user.name)
  //             localStorage.setItem("userId",response.user.id)
  //             history("/show-all-pending")
  //         }
  //         else{
  //             setOnload(false)
  //             setShowError(true)
  //             displayMessage(response.errors.error)
  //             console.log(response)

  //         }
  //     }
  //     catch{
  //         setOnload(false)
  //     }

  // }

  const handleSign = (e) => {
    e.preventDefault();

    setOnload(true);
    fetch(`${route}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: mail,
        password,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.token) {
          setOnload(false);

          localStorage.setItem("token", response.token);
          localStorage.setItem("userName", response.data.name);

          localStorage.setItem("login", true);
          localStorage.setItem("data", JSON.stringify(response.data));
          localStorage.setItem("active", response.data.acive);

          setLogin(true);

          history("/all-users");
        } else {
          setOnload(false);
          displayMessage(response.message);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="login">
      <form action="" onSubmit={handleSign}>
        <h1>Login To DashBoard</h1>
        <input
          value={mail}
          onChange={handleMail}
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={handlePass}
          type="password"
          placeholder="Password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
