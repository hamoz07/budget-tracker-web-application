// rrd imp
import { redirect } from "react-router-dom";

// helper funcs
import { DeleteItem, deleteExpense, fetchData, getAllMatchingBudgets } from "../helpers";

// quick message
import { toast } from "react-toastify";

export async function delBud({ params }) {
  try {
    
    deleteExpense({ key: "new-budget", expid: params.id });

    let all = getAllMatchingBudgets({
      category: "new-expense",
      key: "budgetId",
      val: params.id,
    });

    
    all.forEach((exp) => {
      deleteExpense({ key: "new-expense", expid: exp.id });
    });
    
    if(fetchData("new-budget") === "[]"){
      DeleteItem({"key":"new-budget"})
    }

     toast.success("Budget Successfully Deleted");
  } catch (error) {
    throw new Error("There was a problem deleting your budget ");
  }
  // get back
  return redirect("/");
}
