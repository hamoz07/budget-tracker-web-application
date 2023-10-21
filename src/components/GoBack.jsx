import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid"
import { useNavigate } from "react-router-dom"



export default function GoBack() {
    const naver  = useNavigate()
    const back = ()=>{
        naver(-1)
    }
  return (
    <button className="btn btn--dark" onClick={back}>
      <ArrowUturnLeftIcon width={20}/>
      <span>Go Back</span>
    </button>
  )
}
