/* eslint-disable react/prop-types */
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { useFetcher } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { calcSpentBud } from "../helpers";
import { toast } from "react-toastify";

export default function ExpensesAdder({ budgets, expense }) {
  const data = JSON.parse(budgets) || [];
  // states & data management
  const [expenseManager, setExpenseManager] = useState(false);
  const [isHidden, setIsHidden] = useState(data.length >= 2 ? true : false); // Manage the hidden state
  const [dataCopy, setDataCopy] = useState([]);
  const [titleOfBud, setTitleOfBud] = useState("");
  const [allExcedded, setAllExceeded] = useState(false);
  const dataexp = JSON.parse(localStorage.getItem("new-expense")) || [];
  const [expenses, setExpenses] = useState(dataexp);

  // all refs
  const nameOfBudRef = useRef("");
  const formRef = useRef(null);
  const handleBudName = useRef(null);
  // form state managing
  const formManager = useFetcher();
  const formState = formManager.state === "submitting";
  const access = data
    .filter((budget) => !dataCopy.some((item) => item.id === budget.id))
    .sort((opf, ops) => opf.createdAt - ops.createdAt);

  useEffect(() => {
    const updatedDataCopy = data.filter((am) => {
      const spent = calcSpentBud(am.id);
      return am.amount - spent <= 0; // If the budget's remaining amount is less than or equal to 0
    });

    setDataCopy(updatedDataCopy);

    if (updatedDataCopy?.length > 0) {
      setExpenseManager(true);
      nameOfBudRef.current = updatedDataCopy[0].budname; // Set the name of the exceeded budget
    }

    if (access.length === 1) {
      setIsHidden(false);
    }
  }, []);

  useEffect(() => {
    // this one

    access;

    if (access.length === 1) {
      setTitleOfBud(access[0].budname);
    } else {
      setTitleOfBud("");
    }

    if (
      JSON.parse(localStorage.getItem("new-budget")).length > 1 &&
      access.length > 1
    ) {
      setIsHidden(true);
    }

    titleOfBud;
  }, [budgets]);

  useEffect(() => {
    if (expenseManager) {
      toast.info(
        `You have reached the ${nameOfBudRef.current} budget limit - can't add more expenses`
      );
    }
  }, [expenseManager]);

  const test = data.filter(
    (budget) => !dataCopy.some((item) => item.id === budget.id)
  );

  useEffect(() => {
    if (dataCopy.length === data.length && expenseManager) {
      setAllExceeded(true);
    } else {
      setAllExceeded(false);
    }
  }, [dataCopy, data.length, expenseManager]);

  useEffect(() => {
    if (!formState && formRef.current) {
      formRef.current.reset();
      handleBudName.current.focus();
    }
  }, [formRef, formState]);

  dataCopy;
  data;
  //  (dataCopy.length === JSON.parse(budgets).length && expenseManager);

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
      {allExcedded ? (
        "you can't add more expenses - reached all budget limits"
      ) : (
        <>
          <h2 className="h3">
            Add New{" "}
            <span className="accent">
              {JSON.parse(localStorage.getItem("new-budget"))
                ? JSON.parse(localStorage.getItem("new-budget")).length === 1 &&
                  `${JSON.parse(localStorage.getItem("new-budget"))[0].budname}`
                : ""}
              {titleOfBud.length === 1 && titleOfBud}
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

            <div
              className="grid-sx"
              style={{ display: isHidden ? "block" : "none" }}
            >
              <label htmlFor="budgetCategory">Budget Category</label>
              {!isHidden ? (
                <select name="budgetCategory" id="budgetCategory">
                  {data
                    .filter(
                      (budget) =>
                        !dataCopy.some((item) => item.id === budget.id)
                    )
                    .sort((opf, ops) => opf.createdAt - ops.createdAt)
                    .map((opt) => {
                      return (
                        <option key={opt.id} value={opt.id}>
                          {opt.budname}
                        </option>
                      );
                    })}
                </select>
              ) : (
                <select name="budgetCategory" id="budgetCategory" required>
                  {data
                    .filter(
                      (budget) =>
                        !dataCopy.some((item) => item.id === budget.id)
                    )
                    .sort((opf, ops) => opf.createdAt - ops.createdAt)
                    .map((opt) => {
                      return (
                        <option key={opt.id} value={opt.id}>
                          {opt.budname}
                        </option>
                      );
                    })}
                </select>
              )}
            </div>
            <input type="hidden" name="_action" value={"newExpense"}  />
            <button
              type="submit"
              className="btn btn--dark"
              disabled={formState}
            >
              {!formState ? "Add New Expense" : "Adding..."}
              <CurrencyDollarIcon width={20} />
            </button>
          </formManager.Form>
        </>
      )}
    </div>
  );
}
