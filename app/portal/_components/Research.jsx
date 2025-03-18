"use client"
import { useState, useEffect } from "react"
import Loader from "@/components/Loader"
import Image from "next/image"
import Canada from "@/assets/canada-flag.png"
import Link from "next/link"

const Research = () => {
    const [selections, setSelected] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const initialize = async () => {
            try {
                const response = await fetch("https://veteran-api-for-kim.vercel.app/get-all-selected", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await response.json()

                if(data.Success){
                    setSelected(data.Data)
                } else{
                    alert(data.Message)
                }
            } catch (error) {
                console.error(error)
            } finally{
                setLoading(false)
            }
        }
        initialize()
    },[])

  if (loading) return <Loader />;

  return (
    <div>
        <div className="p-5 container ml-auto mr-auto">
            {selections.length > 0 && (
                <div>
                <h1 className="">Total Being Researched: {selections.length}</h1>
                {selections.map((selection, index)=> (
                    <div className="flex flex-col gap-5 text-black mb-5 bg-white p-2" key={index}>
                        <span className="flex flex-col gap-2">
                            <h2><b>Researcher:</b> {selection?.name || "Error"}</h2>
                            <h2><b>Contact Researcher:</b> <a className="bg-green-500 p-2 rounded-md text-white" href={`mailto:${selection?.email}`}>Send Message</a></h2>
                        </span>
                        <span className="flex flex-col gap-2">
                            <h2><b>Veteran Chosen:</b> {selection?.veteran?.name || "Error"}</h2>
                            <h2><b>Veteran Description:</b> {selection?.veteran?.full_description || "Error"}</h2>
                        </span>
                    </div>
                ))}
                </div>
            )}
            {selections.length === 0 && (
                <h1 className="text-center flex flex-col justify-center items-center">Nobody has been selected for research yet. <br/></h1>
            )}
        </div>
    </div>
  )
}

export default Research
