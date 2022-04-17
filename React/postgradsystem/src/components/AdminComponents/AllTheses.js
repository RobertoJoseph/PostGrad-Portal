import React from "react";
import { useEffect, useState } from "react";
import "../../css/Admin.css";
import Axios from "axios";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import * as HiIcons from "react-icons/hi";


function ListTheses(props) {
  const [theses, setTheses] = useState([]);
  const [selectedSerial, setSelectedSerial] = useState(0);
  const [isIncremented, setIsIncremented] = useState(false);


  const onClickButton = (serialNumber) => {
      console.log("serial is: "+serialNumber);
      setSelectedSerial(serialNumber);
      console.log("serial after is: "+selectedSerial);
      incrementExtension();
  }


  const incrementExtension = () => {
    Axios.get(`http://localhost:9000/admin/incrementExtension/${selectedSerial}`).then(
      (res) => {
          if(res.data.isIncremented){
              setIsIncremented(true);
          }
      }
    ).catch((error) => {
        console.log(error);
      });
  };

  const listTheses = () => {
    Axios.get(
        `http://localhost:9000/admin/listtheses/`
      ).then((res) => {
        setTheses(res.data);
      });
  };


  useEffect(() => {
    listTheses();
    incrementExtension();
    
  }, [selectedSerial, isIncremented]);

  return (
    <div className="row">
      {theses.map((item, index) => {
        return (
          <div key={index} className="col-6 mt-3 mb-3">
            <Card
              id="Card"
              className="border-0"
              style={{ backgroundColor: "white" }}
            >
              <CardHeader
                id="CardHeader"
                style={{ backgroundColor: "#151F31" }}
              >
                <span style={{ color: "white" }}>
                  Thesis&nbsp;Serial No. {item.serialNumber}&nbsp; :&nbsp;&nbsp;{" "}
                  {item.title}
                </span>
              </CardHeader>
              <CardBody id="CardBody" style={{ backgroundColor: "white" }}>
                <dl className="row p-1">
                  <dt className="col-6">Type</dt>
                  <dd className="col-6">{item.type}</dd>
                  <dt className="col-6">Field</dt>
                  <dd className="col-6">{item.field}</dd>
                  <dt className="col-6">Title</dt>
                  <dd className="col-6">{item.title}</dd>
                  <dt className="col-6">Start Date</dt>
                  <dd className="col-6">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(item.startDate)))}
                  </dd>
                  <dt className="col-6">End Date</dt>
                  <dd className="col-6">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(item.endDate)))}
                  </dd>
                  <dt className="col-6">Grade</dt>
                  <dd className="col-6">{item.grade}</dd>
                  <dt className="col-6">Defense Date</dt>
                  <dd className="col-6">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(item.defenseDate)))}
                  </dd>
                  <dt className="col-6">No. of Extensions</dt>
                  <dd className="col-6">{item.noExtension}</dd>
                </dl>
                <Button onClick={() => {onClickButton(item.serialNumber)}}>
                    <HiIcons.HiPlusCircle size="18px"></HiIcons.HiPlusCircle>{"  "}
                    Increment Extensions
                </Button>
              </CardBody>
            </Card>
          </div>
        );
      })}

    </div>
  );
}
export default ListTheses;
