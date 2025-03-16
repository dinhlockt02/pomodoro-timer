import Header from "./components/Header.tsx";
import PhaseChip from "./components/PhaseChip.tsx";
import CircularProgressBar from "./components/CircularProgressBar.tsx";
import Button from "./components/Button.tsx";
import {getTheme, Mode} from "./constants/modes.tsx";
import {formatClockTime} from "./common/time.tsx";
import useProgress from "./hook/useProgress.tsx";
import useMode from "./hook/useMode.tsx";
import {useEffect, useState} from "react";

const ACTIVE_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;


function App() {
    const [maxTime, setMaxTime] = useState<number>(ACTIVE_TIME);
    const [progress, isRunning, toggleProgress, resetProgress] = useProgress(maxTime);
    const [mode, round, toggleMode] = useMode(Mode.ACTIVE, 4)

    useEffect(() => {
        if (progress == 0) {
            toggleMode();
            toggleProgress()
        }
    }, [progress])

    useEffect(() => {
        switch (mode) {
            case Mode.LONG_BREAK:
                setMaxTime(LONG_BREAK_TIME);
                break;
            case Mode.SHORT_BREAK:
                setMaxTime(SHORT_BREAK_TIME);
                break;
            case Mode.ACTIVE:
                setMaxTime(ACTIVE_TIME);
                break;
        }
    }, [mode]);

    useEffect(() => {
        resetProgress(maxTime)
    }, [maxTime]);

    return <div className={getTheme(mode)}>
        <Header/>
        <section className="flex items-center justify-center w-full gap-4 my-8">
            <PhaseChip isActive={mode == Mode.ACTIVE}>Pomodoro</PhaseChip>
            <PhaseChip isActive={mode == Mode.SHORT_BREAK}>Short break</PhaseChip>
            <PhaseChip isActive={mode == Mode.LONG_BREAK}>Long break</PhaseChip>
        </section>
        <section className="flex items-center justify-center w-full gap-4 my-8">
            <CircularProgressBar progress={progress / maxTime * 100} text={formatClockTime(progress)} subtext={"#" + round}/>
        </section>
        <section className="flex items-center justify-center w-full gap-4 my-8">

            <Button onClick={() => toggleProgress()}>{ !isRunning ? "Start" : "Pause"}</Button>
            <Button onClick={() => resetProgress(maxTime)}>Restart</Button>
        </section>
    </div>
}


export default App
