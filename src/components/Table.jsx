/* eslint-disable react/prop-types */
import ExpenseItem from "./ExpenseItem";



export default function Table({expenses,showBadge = true}) {
  
  return (
    <div className="table">
      <table>
        <thead>
            <tr>
                {["Name","Amount","Date",showBadge ?"Budget":null,""].map((item,i)=>(
                    <th key={i}>{item}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {
                expenses.map(exp =>(
                     <tr key={exp.id}>
                        
                        <ExpenseItem expense={exp} showBadger={true} />
                     </tr>
                    ))
            }
        </tbody>
      </table>
    </div>
  )
}
