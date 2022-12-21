import { Card, Badge, Form } from "react-bootstrap";
import Approve from "./assets/images/Approve.png";

const ToppingList = (props) => {
  const style = {
    textToping: {
      color: "#BD0707",
      textAlign: "center",
    },

    imgToping: {
      width: "25%",
      height: "auto",
      marginLeft: "40%",
    },
  };

  return (
    <Form>
      <div>
        <div className="position-relative">
          <Card.Img style={style.imgToping} src={props.image} key={props.id} />

          <Form.Group  className="mb-3 position-absolute top-0 end-0 " controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="" value={props.title}/>
          </Form.Group>
          <Badge
            style={{ top: "10%", left: "65%" }}
            className="position-absolute translate-middle bg-success p-0 border border-light rounded-circle">
            <img style={{ width: "20px" }} src={Approve} alt="" />
          </Badge>
        </div>
        <Card.Text style={style.textToping}>{props.title}</Card.Text>
      </div>
    </Form>
  );
};

export default ToppingList;
