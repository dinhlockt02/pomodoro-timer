import {useState} from "react";
import {Mode} from "../constants/modes.tsx";

export default function useMode(initialMode: Mode, shortBreakCount: number): [Mode, number, () => void] {
    const [mode, setMode] = useState({
        mode: initialMode,
        count: 1,
    });


    function handleToggle({mode, count}: { mode: Mode, count: number }) {
        switch (mode) {
            case Mode.LONG_BREAK:
            case Mode.SHORT_BREAK:
                return {
                    mode: Mode.ACTIVE,
                    count: count + 1,
                }
            case Mode.ACTIVE:
                if ((count % shortBreakCount) == 0) {
                    return {
                        mode: Mode.LONG_BREAK,
                        count: count
                    }
                } else {
                    return {
                        mode: Mode.SHORT_BREAK,
                        count: count
                    }
                }
            default:
                return mode
        }
    }

    function toggleMode() {
        setMode(prevState => handleToggle(prevState))
    }

    return [mode.mode, mode.count, toggleMode];
}