import React from "react";
import { Badge } from "react-bootstrap";
import Approve from "../components/assets/images/Approve.png";

const GreenBadge = () => {
    return (
        <Badge
        style={{ top: "10%", left: "65%" }}
        className="position-absolute translate-middle bg-success p-0 border border-light rounded-circle"
      >
        <img style={{ width: "20px" }} src={Approve} alt="" />
      </Badge>
    )
}

export default GreenBadge