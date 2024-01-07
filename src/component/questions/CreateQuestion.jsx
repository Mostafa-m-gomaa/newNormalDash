import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

function CreateQuestion() {
  const { setOnload, route, token } = useContext(AppContext);
  const [questions, setQuestions] = useState("");
  const [answer, setAnswer] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handelSubmit = function (e) {
    e.preventDefault();

    setOnload(true);
    fetch(`${route}question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        answer,
        question: questions,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.errors) {
          setErr(data.errors[0].msg);
        }
        if (data.data) {
          nav("/all-questions");
        }
        setOnload(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main-sec">
      <h2>Create Question </h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>Question :*</label>
          <input
            placeholder="question"
            type="text"
            required
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Answer :*</label>
          <textarea
            placeholder="answer"
            type="text"
            required
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>

        {err && <p className="error">{err}</p>}

        <button type="submit" className="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateQuestion;

// onChange={(e) => {
//   // const file = e.target.files[0];
//   // if (file && file.type.startsWith("image/")) {
//   //   setProfileImg(file);
//   // } else {
//   //   setProfileImg(null);
//   // }
//   setProfileImg(e.target.value)
// }}
