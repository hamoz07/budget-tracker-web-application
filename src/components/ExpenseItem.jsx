import { Link, useFetcher } from "react-router-dom";
import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingBudgets,
} from "../helpers";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function ExpenseItem({ expense, showBadger}) {
  const { expname, amount, createdAt, budgetId } = expense;

  const fetcher  = useFetcher()
  
  const label = getAllMatchingBudgets({
    category: "new-budget",
    key:"id",
    val: budgetId,
  })[0];

  if(window.location.href.includes("budget")){
    showBadger = false
  }

  return (
    <>
      <td>{expname}</td>
      <td>{formatCurrency(amount)}</td>
      <td>{formatDateToLocaleString(createdAt)}</td>
      {showBadger? (<td>
        <Link
          to={`/budget/${label.id}`}
          className="btn"
          style={{ "--accent": label.color }}
        >
          {label.budname}
        </Link>
      </td>):null}
      <td>
        <fetcher.Form method={"post"}>
          <input type="hidden" name="_action" value={"delExp"}/>
          <input type="hidden" name="expenseId" value={expense.id} />
          <button className="btn btn--warning" type="submit"><TrashIcon width={20}  /></button>
        </fetcher.Form>
      </td>
    </>
  );
}
