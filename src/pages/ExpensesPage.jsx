
// rrd imps
import { useLoaderData } from "react-router-dom";

// helper funcs
import { deleteExpense, fetchData, waiting } from "../helpers";

// rrd imps
import Table from "../components/Table";
import { toast } from "react-toastify";

export const expensesLoader = () => {
  const expense = fetchData("new-expense");
  return { expense };
};

export async function expensesAction({ request }) {
  await waiting();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  
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

export default function ExpensesPage() {
  const { expense } = useLoaderData();

  const expParsed = JSON.parse(expense);

  return (
    <div className="grid-md">
      <h2>All Expenses <small>({expParsed.length } Total)</small></h2>
      <Table
        expenses={expParsed.sort((x, y) => y.createdAt - x.createdAt)}
      />
    </div>
  );
}
