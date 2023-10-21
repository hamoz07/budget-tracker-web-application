import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import  { useEffect, useRef } from "react";
import {  useFetcher } from "react-router-dom";

export default function BudgetForm() {
  const formManager = useFetcher();
  const formState = formManager.state === "submitting";

 // refs
 const formRef = useRef(null);
 const handleBudName = useRef(null);

  useEffect(() => {
    if (!formState && formRef.current) {
      formRef.current.reset();
      handleBudName.current.focus()
    }
  }, [formRef,formState]);
  

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create A New Budget</h2>
      <formManager.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-sx">
          <label htmlFor="budget">Budget Name</label>
          <input
            type="text"
            id="budget"
            name="budget"
            placeholder="e.g: Books"
            required
            ref={handleBudName}
          />
        </div>
        <div className="grid-sx">
          <label htmlFor="budgetamount">Budget Amount</label>
          <input
            type="number"
            inputMode="decimal"
            id="budgetamount"
            name="budgetamount"
            placeholder="e.g: 70$"
            required
            step={"1.00"}
          />
        </div>
        <input type="hidden" name="_action" value={"newBudget"} />
        <button type="submit" className="btn btn--dark" disabled={formState} >
          {!formState ? "Create New Budget": "Creating..." }<CurrencyDollarIcon width={20} />
        </button>
      </formManager.Form>
    </div>
  );
}
