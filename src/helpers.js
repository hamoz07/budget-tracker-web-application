// waiting
export const waiting = () =>
  new Promise((res) => setTimeout(res, Math.random() * 900));

// username & others
export const createData = ({ key, val }) => {
  return localStorage.setItem(key, JSON.stringify(val));
};

// start new budget scenario
export const randomBudgetClr = () => {
  const changableVal = fetchData("new-budget")?.length ?? 0;
  return `${changableVal * 34} 65% 50%`;
};

export const createBudget = ({ budname, amount, color }) => {
  let budInfo = {
    id: crypto.randomUUID(),
    budname,
    amount: +amount,
    createdAt: Date.now(),
    color: randomBudgetClr(),
  };
  
  // Get existing budgets
  const preBudgets = JSON.parse(fetchData("new-budget")) ?? [];
  preBudgets.push(budInfo);

  // Update the budget data in localStorage
  localStorage.setItem("new-budget", JSON.stringify(preBudgets));
};

// end new budget scenario 

export const createExpense = ({ expname, amount, budgetId }) => {
  let budInfo = {
    id: crypto.randomUUID(),
    expname,
    amount: +amount,
    createdAt: Date.now(),
    budgetId,
  };
  // Get existing budgets
  const preExpenses = JSON.parse(fetchData("new-expense")) ?? [];
  preExpenses.push(budInfo);

  // Update the budget data in localStorage
  localStorage.setItem("new-expense", JSON.stringify(preExpenses));
};

export const fetchData = (key) => {
  return localStorage.getItem(key);
};

export const getAllMatchingBudgets = ({category,key,val}) => {
  const getSpecific = fetchData(category)
  const allBudgetData= JSON.parse(getSpecific) ?? [];
  const reachCategory = allBudgetData.filter(item =>  item[key] === val)
  return reachCategory
}

export const deleteExpense = ({key, expid}) =>{

  const existingData = JSON.parse(fetchData(key))
  if (expid) {
    const newData = existingData.filter((item) => item.id !== expid);
    return localStorage.setItem(key, JSON.stringify(newData));
    
  }
  return localStorage.removeItem(key);

}

export const DeleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};

export const calcSpentBud = (budId) => {
  const allExpenses = JSON.parse(fetchData("new-expense")) ?? [];
  const spent = allExpenses.reduce((acc, exp) => {
    if (exp.budgetId !== budId) return acc;

    return (acc += exp.amount);
  }, 0);
  return spent
};

// Format currency

export const formatDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();

export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "EGP"
  })
}
