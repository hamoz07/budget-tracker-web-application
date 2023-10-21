// rrd imp
import { redirect } from "react-router-dom";
// helper funcs
import { DeleteItem } from "../helpers";
// quick message
import {  toast } from 'react-toastify';

export async function LogOutProcess() {
  // del the user  
  DeleteItem({
        key:"username"
    });
  DeleteItem({
        key:"new-budget"
    });
  DeleteItem({
        key:"new-expense"
    });
    toast.success('User Successfully Deleted');
  // get back
  return redirect("/");
}
