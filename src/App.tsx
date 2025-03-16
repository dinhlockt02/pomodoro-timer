import Header from "./components/Header.tsx";
import PhaseChip from "./components/PhaseChip.tsx";
import CircularProgressBar from "./components/CircularProgressBar.tsx";
import {RefObject, useEffect, useRef, useState} from "react";
import Button from "./components/Button.tsx";
import {Mode} from "./constants/modes.tsx";

const MAX_TIME = 1500;

function formatTime(seconds: number): string {
    const result = []
    if (seconds >= 3600) {
        const hour = Math.floor(seconds / 3600)
        if (hour < 10) {
            result.push('0' + hour)
        } else {
            result.push(hour.toString());
        }
        seconds = seconds % 3600;
    }

    if (seconds >= 60) {
        const minute = Math.floor(seconds / 60);
        if (minute < 10) {
            result.push('0' + minute)
        } else {
            result.push(minute.toString());
        }
        result.push();
        seconds = seconds % 60;
    }

    if (seconds < 10) {
        result.push('0' + seconds)
    } else {
        result.push(seconds.toString());
    }

    return result.join(':')
}

function getTheme(mode: Mode): string | undefined {
    switch (mode) {
        case Mode.LONG_BREAK:
            return "long-break";
        case Mode.SHORT_BREAK:
            return "short-break";
    }
}

function App() {
    const [progress, setProgress] = useState(MAX_TIME);
    const [mode, setMode] = useState(Mode.ACTIVE);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef: RefObject<number> = useRef(0);

    useEffect(() => {
        if (progress == 0) {
            setIsRunning(false);
            switch (mode) {
                case Mode.LONG_BREAK, Mode.SHORT_BREAK:
                    setMode(Mode.ACTIVE);
                    break;
                case Mode.ACTIVE:
                    setMode(Mode.SHORT_BREAK);
            }
        }
    }, [progress])

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setProgress((prev) => prev - 1);
            }, 10)
        } else {
            clearInterval(intervalRef.current);
        }


        return () => {
            // clears timeout before running the new effect
            clearInterval(intervalRef.current);
            intervalRef.current = 0;
        };
    }, [isRunning])


    return <div className={getTheme(mode)}>
        <Header/>
        <section className="flex items-center justify-center w-full gap-4 my-8">
            <PhaseChip isActive={mode == Mode.ACTIVE} onClick={() => {
                setMode(Mode.ACTIVE);
            }}>Pomodoro</PhaseChip>
            <PhaseChip isActive={mode == Mode.SHORT_BREAK} onClick={() => {
                setMode(Mode.SHORT_BREAK);
            }}>Short break</PhaseChip>
            <PhaseChip isActive={mode == Mode.LONG_BREAK} onClick={() => {
                setMode(Mode.LONG_BREAK);
            }}>Long break</PhaseChip>
        </section>
        <section className="flex items-center justify-center w-full gap-4 my-8">
            <CircularProgressBar progress={progress / MAX_TIME * 100} text={formatTime(progress)}/>
        </section>
        <section className="flex items-center justify-center w-full gap-4 my-8">
            <Button onClick={() => setIsRunning(true)}>Start</Button>
            <Button onClick={() => setIsRunning(false)}>Pause</Button>
            <Button onClick={() => setProgress(MAX_TIME)}>Restart</Button>
        </section>
    </div>
}


export default App
