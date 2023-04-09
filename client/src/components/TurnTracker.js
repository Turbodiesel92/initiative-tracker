import { useEffect, useState } from 'react'


function TurnTracker() {
    const [playerCharacters, setPlayerCharacters] = useState([])
    const [nonPlayerCharacters, setNonPlayerCharacters] = useState([])
    const [isStarted, setIsStarted] = useState(false)

    function handleStart(event) {
        event.preventDefault()
        setIsStarted(true)
    }

    useEffect(() => {
        fetch('/playercharacter')
            .then((response) => response.json())
            .then(setPlayerCharacters)
    }, [])

    useEffect(() => {
        fetch('/npc')
            .then((response) => response.json())
            .then(setNonPlayerCharacters)
    }, [])

    return (
        <div>
            {(!isStarted) ? <h1>Not Started</h1> : <h1>Started</h1>}
            {(!isStarted) ?
                <form onSubmit={handleStart} if>
                    <table className="w-full">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Initiative</th>
                        </tr>

                        </thead>
                        <tbody>

                        {playerCharacters.map((pc) => (
                            <tr key={`pc${pc.id}`}>
                                <td>
                                    {pc.pc_name}
                                </td>
                                <td>
                                    <input
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        type="number"
                                        />
                                </td>
                            </tr>
                        ))}
                        {nonPlayerCharacters.map((npc) => (
                            <tr key={`npc${npc.id}`}>
                                <td>
                                    {npc.npc_name}
                                </td>
                                <td>
                                    <input
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        type="number"
                                        />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button
                        type="submit"
                        className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
                    >
                        Start Combat
                    </button>
                </form>
                :
                <h1>oops</h1>


            }

        </div>
    )
}




export default TurnTracker