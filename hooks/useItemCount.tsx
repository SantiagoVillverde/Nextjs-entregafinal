"use client"
import {useState} from 'react'

const UseItemCount = () => {

    const [count, setCount] = useState(1);
    const handleSum = () => setCount(count + 1);
    const handleRest = () => setCount(count - 1);

    return {
        count,
        handleSum,
        handleRest
    }
}

export default UseItemCount
