// rrd imports
import { useLoaderData,Outlet } from "react-router-dom";
// helper funcs
import { fetchData } from "../helpers"

// main loader
export const MainLoader = () =>{
    const username = fetchData("username")
    return {username}
}

// imgs
import WaveImg from '../assets/wave.svg'

// components
import Navbar from "../components/navbar";

export default function Main() {
    // constant data
    const {username}  = useLoaderData()

  return (
    <div className="layout">
      <Navbar username={username} />
      <main><Outlet /></main>
      <img src={WaveImg} alt="wave"  />
    </div>
  )
}
