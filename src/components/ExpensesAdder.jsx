/* eslint-disable react/prop-types */
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { useFetcher } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { calcSpentBud } from "../helpers";
import { toast } from "react-toastify";

export default function ExpensesAdder({ budgets }) {
  // states & data management
  const [expenseManager, setExpenseManager] = useState(false);
  
  const data = JSON.parse(budgets) || [];
  const [isHidden, setIsHidden] = useState(data.length >= 2 ? true : false); // Manage the hidden state
  
  const [dataCopy, setDataCopy] = useState(data ? [...data] : []);
  
  // all refs
  const nameOfBudRef = useRef(""); 
  const formRef = useRef(null);
  const handleBudName = useRef(null);
  // form state managing
  const formManager = useFetcher();
  const formState = formManager.state === "submitting";

  useEffect(() => {
    let hasReachedLimit = false;

    const handleBUd = () => {
      const updatedDataCopy = dataCopy.filter((am) => {
        const spent = calcSpentBud(am.id);
        if (!hasReachedLimit && am.amount - spent <= 0) {
          setExpenseManager(true);
          hasReachedLimit = true;
          nameOfBudRef.current = am.budname;
          return false;
        }
        return true;
      });

      setDataCopy(updatedDataCopy);
    };

    handleBUd();
  }, [budgets]);

  useEffect(() => {
    if (expenseManager) {
      toast.info(
        `You have reached the ${nameOfBudRef.current} budget limit - can't add more expenses`
      );
    }
  }, [expenseManager]);

  useEffect(() => {
    if (!formState && formRef.current) {
      formRef.current.reset();
      handleBudName.current.focus();
    }
  }, [formRef, formState]);

  return (
    <div
      className="form-wrapper"
      style={{
        "--accent": data
          ? data.map((fdata) => {
              fdata.color;
            })
          : "",
      }}
    >
      <h2 className="h3">
        Add New{" "}
        <span className="accent">
          {data ? data.length === 1 && `${data[0].budname}` : ""}
        </span>{" "}
        Expense
      </h2>
      <formManager.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-sx">
          <label htmlFor="expense">Expense Name</label>
          <input
            type="text"
            id="expense"
            name="expense"
            placeholder="e.g: harry potter"
            required
            ref={handleBudName}
          />
        </div>
        <div className="grid-sx">
          <label htmlFor="expenseAmount">Expense Amount</label>
          <input
            type="number"
            inputMode="decimal"
            id="expenseAmount"
            name="expenseAmount"
            placeholder="e.g: 10$"
            required
            step={"1.00"}
          />
        </div>
        <div className="grid-sx" style={{display:isHidden ? "block" : "none"}}>
          <label htmlFor="budgetCategory">Budget Category</label>
          <select name="budgetCategory" id="budgetCategory" required>
            {
              
                  (expenseManager ? dataCopy : data).sort((opf, ops) => opf.createdAt - ops.createdAt)
                  .map((opt) => {
                    return (
                      <option key={opt.id} value={opt.id}>
                        {opt.budname}
                      </option>
                    );
                  })}
          </select>
        </div>
        <input type="hidden" name="_action" value={"newExpense"} />
        <button type="submit" className="btn btn--dark" disabled={formState}>
          {!formState ? "Add New Expense" : "Adding..."}
          <CurrencyDollarIcon width={20} />
        </button>
      </formManager.Form>
    </div>
  );
}
