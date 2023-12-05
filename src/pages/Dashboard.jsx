// rrd imports
import { Link, useLoaderData } from "react-router-dom";
// helper funcs
import {
  createBudget,
  createExpense,
  deleteExpense,
  fetchData,
  waiting,
} from "../helpers";

// components
import ExpensesAdder from "../components/ExpensesAdder.jsx";
import Table from "../components/Table.jsx";


export async function DashboardAction({ request }) {
  await waiting();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  function runAction(){
    
    const reit = window.location.reload()
    let success= toast.success(`${values.budget} Budget created successfully`)
    return {
      reit,
      success
    }
  }


  if (_action === "createUser") {
    try {
      localStorage.setItem("username", values.name);
      return toast.success(`Welcome, ${values.name}`);
    } catch {
      throw new Error("there was a problem creating your account");
    }
  }

  if (_action === "newBudget") {
    try {
      createBudget({
        budname: values.budget,
        amount: values.budgetamount,
      });
      // window.location.href = window.location.pathname + '?t=' + new Date().getTime();
      return toast.success(`${values.budget} Budget created successfully`)
    } catch {
      throw new Error("something wrong happened");
    }
  }

  if (_action === "newExpense") {
    try {
      createExpense({
        expname: values.expense,
        amount: values.expenseAmount,
        budgetId: values.budgetCategory,
      });
      return toast.success(`${values.expense} Expense Added`);
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
}


// main loader
export const DashboardLoader = () => {
  const username = fetchData("username");
  const budget = fetchData("new-budget");
  
  const expense = fetchData("new-expense");
  return { username, budget, expense };
};


// components
import Welcome from "../components/Welcome.jsx";
import { toast } from "react-toastify";

import BudgetForm from "../components/BudgetForm";
import BudgetDetails from "../components/BudgetDetails";
import { useState } from "react";
import { useEffect } from "react";

export default function Dashboard() {
  const { username, budget, expense } = useLoaderData();  
  
  const currentDate = new Date();
  const currentTime = currentDate.getHours();
  
  let greeting = "";
  
  if (currentTime >= 12 && currentTime < 17) {
    greeting = "Good Afternoon";
  } else if (currentTime >= 17) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Morning";
  }

  return (
    <>
      {username ? (
        <div className="dashboard">
          <h1>
            {greeting}, <span className="accent">{username}</span>
          </h1>

          <div className="grid-sm">
            {fetchData("new-budget") ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <BudgetForm />
                  <ExpensesAdder budgets={budget} />
                </div>
                <h2>Budgets</h2>
                <div className="budgets">
                  {JSON.parse(fetchData("new-budget")).map((bud) => {
                    return <BudgetDetails key={bud.id} budget={bud} />;
                  })}
                </div>
                {expense && JSON.parse(expense).length > 0 && (
                  <div className="grid-md">
                    <h2>
                      Recent Expenses{" "}
                      <small>({JSON.parse(expense).length} total)</small>
                    </h2>
                    <Table
                      expenses={JSON.parse(expense)
                        .sort((x, y) => y.createdAt - x.createdAt)
                        .slice(0, 8)}
                      budget={budget}
                    />
                    {JSON.parse(expense).length > 8 && (
                      <Link className="btn btn--dark" to={"expenses"}>
                        View all expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <BudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Welcome />
      )}
    </>
  );
}
