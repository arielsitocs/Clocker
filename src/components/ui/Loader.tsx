export default function Loader({ state, setState }: any) {
    if(state === false) return (null);

    return (
        <div className="flex justify-center items-center w-full h-screen py-10">
            <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
    )
}