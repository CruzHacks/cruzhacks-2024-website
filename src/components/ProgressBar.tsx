import React from "react"
import { CheckIcon } from "@heroicons/react/24/solid"

interface ProgressBarProps {
    activeStep: number,
    steps: string[],
}

interface BubbleProps {
    completed: boolean,
    active: boolean,
}


const Line = ({completed, active}: BubbleProps) => {
    if (completed || active) {
        return (
            <div className="flex h-0.5 w-full bg-[#06F]" />
        )
    } else {
        return (
            <div className="flex h-0.5 w-full bg-[#676D84]" />
        )
    }
}


const Bubble = ({completed, active}: BubbleProps) => {
    if (completed) {
        return (
            <div className="h-5 w-5 rounded-full border-2 border-[#06F] bg-[#06F] text-black">
                <CheckIcon className='h-4 w-4' aria-hidden='true' />
            </div>
        )
    } else if (active) {
        return (
            <div className="h-5 w-5 rounded-full  border-2 border-[#06F] bg-[#31375E] text-black">
                <div className="h-4 w-4" />
            </div>
        )
    } else {
        return (
            <div className="h-5 w-5 rounded-full border-2 border-[#676D84] bg-[#31375E]">
                <div className="h-4 w-4" />
            </div>
        )
    }
}

const ProgressBar = ({
    activeStep,
    steps,
}: ProgressBarProps) => {

    return (
        <div className="relative flex w-full flex-row flex-nowrap items-center">
            {steps.map((step, index) => (
                    <div key={index} className={(index === 0 ? "relative flex flex-row items-center justify-end" : "relative flex w-full flex-row items-center justify-end")}>
                        {index !== 0 &&
                            <Line completed={index < activeStep} active={index === activeStep}/>
                        }
                        <Bubble completed={index < activeStep} active={index === activeStep} />
                    </div>
            ))}
        </div>
    )
}

export default ProgressBar
