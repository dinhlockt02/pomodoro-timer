

interface PhaseChipParams {
    children: string;
    isActive?: boolean;
    onClick?: () => void;
}

export default function PhaseChip(props: PhaseChipParams) {

    if (!props.isActive) {
        return <button className=" cursor-pointer flex items-center justify-center w-auto px-8 py-2 text-primary font-lobster" onClick={props.onClick}>
            {props.children}
        </button>
    }

    return (
        <div className=" cursor-pointer flex items-center justify-center w-auto px-8 py-2 bg-primary rounded-full text-white font-lobster" onClick={props.onClick}>
            {props.children}
        </div>
    )
}