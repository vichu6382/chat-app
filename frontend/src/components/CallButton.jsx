import { VideoIcon } from "lucide-react"

const CallButton = ({ handleVideoCall }) => {
    return (
        <div className="p-3 border-b d-flex align-items-center justify-content-end max-w-9xl mx-auto w-100 position-absolute top-0">
            <button onClick={handleVideoCall} className="btn btn-success btn-sm text-white">
                <VideoIcon className="size-6" />
            </button>
        </div>
    )
}

export default CallButton