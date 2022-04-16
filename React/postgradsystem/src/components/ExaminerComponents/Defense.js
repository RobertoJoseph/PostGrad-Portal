import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import DataTable from "./Datatable";
import "../../css/newNav.css";
import * as AiIcons from "react-icons/ai";

function Defense(props) {
  const [data, setData] = useState([]);
  const [currentWord, setCurrentWord] = useState("");

  const search = (rows) => {
    var word = currentWord.toLowerCase();
    return rows.filter((row) => row.Title.toLowerCase().indexOf(word) > -1);
  };

  useEffect(() => {
    Axios.get(
      `http://localhost:9000/examiner/attenddefense/${props.examinerID}`
    )
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="col-12 mt-3">
        <label className="label">
          <h3>Search</h3>
        </label>
        <input
          type="text"
          className="form-control"
          value={currentWord}
          placeholder="Search By Thesis Title"
          onChange={(e) => {
            setCurrentWord(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <DataTable data={search(data)} />
      </div>
    </div>
  );
}
export default Defense;
