'use client'

import { InputForm, Output } from "@/components";
import { useCompletion } from "ai/react";
import { useState } from "react";

export default function ChatBot() {
    const [input, setInput] = useState('')
    const { complete, completion, isLoading, error } = useCompletion({
        api: '/api/jugaad',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        complete(input)
    }

    const sampleInput = `Bhai, phone charger kharab ho gaya, naye ka paisa nahi hai. Koi jugaad hai?`
    return (
        <div className="bg-[#f2f2f2] text-[#333333] min-h-screen w-full pt-40 m-0">
            <h1 className="text-4xl font-bold mb-6 text-center">Jugaad Finder - Desi Hack Generator</h1>
            {/* <p className='text-xl font-semibold mb-6 text-center text-white'>Arre shaadi ka budget banane mein problem ho rahi hai? Yeh raha tumhara digital panditji! Bas groom ke details daalo, aur hum tumhe ek "fun estimate" denge ki dulhan ke ghar walon ko kitna "dil se (aur pocket se)" contribute karna chahiye.</p> */}
            <div className="flex-col md:flex-row gap-4 my-6 flex justify-center w-full px-[5%]">
                <div className="w-full md:w-1/2">
                    <InputForm
                        input={input}
                        setInput={setInput}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        placeholder={`Example input :- 
                            ${sampleInput}`}
                        sampleInput={sampleInput}
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <Output completion={completion} error={error} isLoading={isLoading} />
                </div>
            </div>
        </div>
    )
}