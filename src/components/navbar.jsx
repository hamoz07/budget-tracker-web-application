// imgs
import logo from "../assets/logomark.svg";

// rrd imps
import { Form, NavLink } from "react-router-dom";

// icons
import { TrashIcon } from "@heroicons/react/24/solid";

export default function Navbar({ username }) {
  return (
    <nav>
      <NavLink to={"/"}>
        <img src={logo} alt="" height={30} />
        <span>HomeBudget</span>
      </NavLink>
      {username && (
        <Form
            method="post"
            action="/logout"
            onSubmit={(e)=>{
                let conMsg = confirm("Are You Sure ?")
                if(!conMsg){
                    e.preventDefault()
                }
            }}
        >
          <button

          className="btn btn--warning">Delete User
          <TrashIcon width={20} /></button>
        </Form>
      )}
    </nav>
  );
}
