/* eslint-disable react/prop-types */
import { Form, Link } from "react-router-dom";
import { formatCurrency, calcSpentBud } from "../helpers";
import { TrashIcon } from "@heroicons/react/24/solid";
// import ConfirmMsg from "./ConfirmMsg";
// import { useState } from "react";

export default function BudgetDetails({ budget, showDel = false }) {
  const { budname, amount, color, id } = budget;

  const spent = calcSpentBud(id);

  // const [showConfirmMsg, setShowConfirmMsg] = useState(false);
  // const [accpet, setAccept] = useState(false);

  // const handleDeleteClick = () => {
  //   setShowConfirmMsg(true);
  // };

  // const handleConfirmDelete = () => {
  //   setAccept(true)
  //   setShowConfirmMsg(false);
  // };

  return (
    <>
      {/* {showConfirmMsg && (
        <ConfirmMsg>
          <button
            className="btn btn--outline"
            onClick={() => setShowConfirmMsg(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn--warning"
             onClick={handleConfirmDelete}
          >
            Yes
          </button>
        </ConfirmMsg> */}
      {/* )} */}
      <div className="budget" style={{ "--accent": color }}>
        <div className="progress-text">
          <h3>{budname}</h3>
          <p>{formatCurrency(amount)} budgeted</p>
        </div>
        <progress max={amount} value={spent}>
          {formatCurrency(spent / amount)}
        </progress>
        <div className="progress-text">
          <small>{formatCurrency(spent)} spent</small>
          <small>{formatCurrency(amount - spent)} remaining</small>
        </div>
        {showDel ? (
          <div className="flex-sm">
            <Form
              action="delete"
              method="post"
              onSubmit={(event) => {
                if (
                  !confirm(`Are You Sure You Want to Delete ${budname} budget`)
                ) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit" className="btn" 
              
              >
                Delete Budget <TrashIcon width={20} />
              </button>
            </Form>
          </div>
        ) : (
          <div className="flex-sm">
            <Link to={`budget/${id}`} className="btn">
              Show Details
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
