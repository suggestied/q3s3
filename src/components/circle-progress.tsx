export function CircleProgressComponent({
    percentage
}: {
    percentage: number;
}) {
    return (
        <div className="relative size-20 text-white">
            <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">

                <circle cx="18" cy="18" r="14" fill="none" className="stroke-current opacity-20" stroke-width="4.5"></circle>
                <circle cx="18" cy="18" r="14" fill="none" className="stroke-current" stroke-width="4.5" stroke-dasharray="88" stroke-dashoffset={88 - (percentage / 100) * 88} stroke-linecap="round"></circle>

            </svg>

            <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <span className="text-center text-md font-bold">{percentage}%</span>
            </div>
        </div>
    )
}