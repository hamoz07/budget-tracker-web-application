/* eslint-disable react-hooks/rules-of-hooks */

// icons
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { useState } from "react";
import { Form, useFetcher } from "react-router-dom";

// imgs
import illustration from '../assets/illustration.jpg'

export default function Welcome() {
  const [name, useName] = useState("");
  const formManager = useFetcher();
  const formState = formManager.state === "submitting";
  const handleInput = (e) => {
    const inputValue = e.target.value;
    if (/^[a-z]/gi.test(inputValue)) {
      useName(inputValue);
      toast.dismiss();
    
    } else if (/\d*$/gi.test(inputValue)) {
      useName(inputValue);
      toast.dismiss();
    } else {
      useName("");
      toast.error("Please enter a valid username");
    }


    if (inputValue.length < 4) {
      toast.error("username should be more than 4 characters");
    }
  };

  return (
    <div className="intro">
      <div>
        <h1>your way to financial freedom</h1>
        <p>
        Personal budgeting is the secret to financial freedom. Start your journey today.
        </p>
        <formManager.Form method="post">
          <input
            type="text"
            required
            id="name-control"
            name="name"
            autoComplete="given-name"
            aria-label="name"
            placeholder="just enter your name and start!"
            onChange={handleInput}
            value={name}
          />
          <input type="hidden" name="_action" value={"createUser"} />
          <button type="submit" className="btn btn--dark" disabled={formState}>
            <span>{!formState ? "Create": "creating..."}</span>
            <UserPlusIcon width={20}/>
          </button>
        </formManager.Form>
      </div>
      <img src={illustration} alt="Person with money" width={600} />
    </div>
  );
}
