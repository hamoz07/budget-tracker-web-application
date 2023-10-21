import { useFetcher, useLoaderData } from "react-router-dom";
import { createExpense, deleteExpense, fetchData, getAllMatchingBudgets, waiting } from "../helpers";
import BudgetDetails from "../components/BudgetDetails";
import GoBack from "../components/GoBack";

import { useEffect, useRef } from "react";

import { toast } from "react-toastify";
import ExpensesAdder from "../components/ExpensesAdder";
import Table from "../components/Table";

// loader
export const BUdgetLoader = ({ params }) => {
  const BudgetItem = getAllMatchingBudgets({
    category: "new-budget",
    key: "id",
    val: params.id,
  })[0];

  const ExpenseItem = getAllMatchingBudgets({
    category: "new-expense",
    key: "budgetId",
    val: params.id,
  })[0];
  
  return { BudgetItem,ExpenseItem };
};

export async function BudgetAction({ request }) {
  await waiting();
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

  
    if (_action === "newExpense") {
      try {
        createExpense({
          expname: values.expense,
          amount: values.expenseAmount,
          budgetId: values.budgetCategory,
        });
        return  toast.success(`${values.expense} Expense Added`);
      } catch {
        throw new Error("something wrong happened");
      }
    }
  
    if (_action === "delExp") {
      try {
        deleteExpense({
          key: "new-expense",
          expid: values.expenseId,
        });
        return toast.success(`Expense deleted`);
      } catch {
        throw new Error("something wrong happened");
      }
    }

    if (_action === "delBud") {
      try {
        deleteExpense({
          key: "new-budget",
          expid: values.specificbudgetId,
        });
        
        return toast.success(`Expense deleted`);
      } catch {
        throw new Error("something wrong happened");
      }
    }
}

export default function BudgetPage() {
    
  const formManager = useFetcher();
  const formState = formManager.state === "submitting";
  // refs
  const formRef = useRef(null);
  const handleBudName = useRef(null);

  useEffect(() => {
    if (!formState && formRef.current) {
      formRef.current.reset();
      handleBudName.current.focus();
    }
  }, [formRef, formState]);

  
  const { BudgetItem ,ExpenseItem } = useLoaderData();
  const expenses  = []
  expenses.push(ExpenseItem)

  

  
  return (
    <div className="grid-lg"   
    style={{"--accent":BudgetItem?.color}}
    >
      <GoBack />
      <h1 className="h2">
        <span className="accent">{BudgetItem?.budname}</span> Overview
      </h1>
      <div className="flex-lg">
        {BudgetItem ? (
        <BudgetDetails 
         budget={BudgetItem} 
         showDel={true} 
        />
        ):""}
        
        <ExpensesAdder budgets={BudgetItem?JSON.stringify([BudgetItem]) : null} />
        {ExpenseItem && JSON.parse(fetchData("new-expense")).length > 0 && (
        <div className="grid-lg">
            <h2>Recent<span className="accent"> {BudgetItem?.budname} </span>Expenses</h2>
            <Table expenses={[ExpenseItem]} showBadge={false} />
        </div>
        )}
      </div>
    </div>
  );
}
