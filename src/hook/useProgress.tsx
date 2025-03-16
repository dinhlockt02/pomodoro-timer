import {RefObject, useEffect, useRef, useState} from "react";

const intervalWorker = `
    let count = 0;
    
    setInterval(() => {
        count += 1;
        postMessage(count); // Send data to the main thread
    }, 100);
`

function getIntervalWorker() {
    const blob = new Blob([intervalWorker], { type: "application/javascript" });
    return new Worker(URL.createObjectURL(blob));
}

export default function useProgress(maxTime: number): [number, boolean, () => void, (maxTime: number) => void] {
    const [progress, setProgress] = useState(maxTime);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef: RefObject<Worker | null> = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = getIntervalWorker()
            intervalRef.current.onmessage = (_) => {
                setProgress((prev) => prev - 1);
            };
        } else {
            intervalRef.current?.terminate()
        }
        return () => {
            intervalRef.current?.terminate()
            intervalRef.current = null;
        };
    }, [isRunning])

    const toggleProgress = ()=>  {
        setIsRunning(curr => !curr)
    }
    const resetProgress = () => {
        setProgress(maxTime)
        setIsRunning(false)
    }

    return [progress, isRunning, toggleProgress, resetProgress];
}