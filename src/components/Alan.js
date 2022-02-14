import React, { useEffect } from "react";
import { Button, ListGroup, ListGroupItem, ProgressBar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchAllData } from "../redux/actions/SubjActions";

const Alan = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllData();
  }, []);

  const filteredList = useSelector((state) => state.Reducer.productList);
  const location = useLocation();
  const newId = location.state.newId;

  const handleSubj = (id) => {
    const selectedItem = newData.subjects.filter((e) => {
      return e.id === id;
    });
    console.log(selectedItem);
    navigate("/detail", { state: { newId, id, selectedItem } });
  };

  const [newData] = filteredList?.filter((e) => {
    return e.id === newId;
  });
  console.log(filteredList);

  return (
    <div className='alan-all'>

      <ListGroup className="alan-list">
                
      <Button
        onClick={() => navigate("/")}
      >
        GERİ
      </Button>

        <ListGroup.Item style={{ textAlign: "center", backgroundColor:"#FC4F4F" }}>

      {newData.main} Bilgisi Konuları
        </ListGroup.Item>

        {newData.subjects?.map((task) => (
          <ListGroup.Item
            key={task.id}
            onClick={() => handleSubj(task.id)}
            className="alan-list-subj"
            variant="dark"
          >
            <p>{task.subj}</p>
            <Button className='alan-buttons' variant={task.isDone ? "success" : "danger"}>
              {task.isDone ? "Konu Tamamlandı" : "Konu eksik"}
            </Button>
            <ProgressBar
              className="progresBar"
              animated
              now={task.targetRate}
              label={
                task.target !== 0
                  ? "% " + task.targetRate
                  : "Henüz Başlatılmadı"
              }
            />
          </ListGroup.Item>


        ))}
      </ListGroup>
    </div>
  );
};

export default Alan;
