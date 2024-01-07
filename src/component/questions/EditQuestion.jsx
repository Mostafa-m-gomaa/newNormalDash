import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function EditQuestion() {
  const { setOnload, route, token } = useContext(AppContext);
  const [questions, setQuestions] = useState("");
  const [answer, setAnswer] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const id = useParams().id;
  useEffect(() => {
    setOnload(true);
    fetch(`${route}/question/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.data.question);
        setAnswer(data.data.answer);
        setOnload(false);
      });
  }, []);
  const handelSubmit = function (e) {
    e.preventDefault();

    setOnload(true);
    fetch(`${route}/question/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: {
        answer,
        question: questions,
      },
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
      <h2>Edit Question </h2>
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
          Edit
        </button>
      </form>
    </div>
  );
}

export default EditQuestion;
