interface CircularProgressBarProps {
    size?: number;
    progress: number;
    text?: string | number;

}

export default function CircularProgressBar({size = 30, progress, text}: CircularProgressBarProps) {
    if (progress <= 0) {
        progress = 0;
    }
    const circumference = 2 * Math.PI * 45;
    const offset = circumference * ((100 - progress)/100);
    return (
        <svg width={size + '%'} height={size + '%'} viewBox="0 0 160 160">
            <g className="origin-center -rotate-90">
                <circle r="45%" cx="50%" cy="50%" fill="transparent" stroke="#e0e0e0" strokeWidth="5%"></circle>
                <circle r="45%" cx="50%" cy="50%" fill="transparent" className="stroke-primary" strokeWidth="5%" strokeDasharray={circumference + '%'} strokeDashoffset={offset + '%'}></circle>
            </g>
            (!!text && (<g transform="translate(80 80)" className="origin-center">
            <text textAnchor="middle" dominantBaseline="middle" className="font-lobster">{text}</text>
            </g>)
        </svg>
    );
}