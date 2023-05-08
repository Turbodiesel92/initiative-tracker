import { useEffect, useState } from "react";
import { Button } from "../styles";
// import { HighlightedRow } from "../styles";

function TurnTracker() {
  const [playerCharacters, setPlayerCharacters] = useState([]);
  const [nonPlayerCharacters, setNonPlayerCharacters] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [updatedCharacterName, setUpdatedCharacterName] = useState("");

  // Function for starting and displaying the tracker

  function handleStart(event) {
    event.preventDefault();

    const updatedPlayerCharacters = playerCharacters.map((pc) => {
      const initiativeInput = document.getElementById(`pc-initiative-${pc.id}`);
      const initiativeScore = parseInt(initiativeInput.value, 10);
      return {
        ...pc,
        initiative: initiativeScore,
      };
    });

    const updatedNonPlayerCharacters = nonPlayerCharacters.map((npc) => {
      const initiativeInput = document.getElementById(
        `npc-initiative-${npc.id}`
      );
      const initiativeScore = parseInt(initiativeInput.value, 10);
      return {
        ...npc,
        initiative: initiativeScore,
      };
    });

    const sortedPlayerCharacters = updatedPlayerCharacters.sort(
      (a, b) => b.initiative - a.initiative
    );
    const sortedNonPlayerCharacters = updatedNonPlayerCharacters.sort(
      (a, b) => b.initiative - a.initiative
    );

    setPlayerCharacters(sortedPlayerCharacters);
    setNonPlayerCharacters(sortedNonPlayerCharacters);

    setIsStarted(true);
  }

  // Fetching all the actors

  useEffect(() => {
    fetch("/playercharacter")
      .then((response) => response.json())
      .then(setPlayerCharacters);
  }, []);

  useEffect(() => {
    fetch("/npc")
      .then((response) => response.json())
      .then(setNonPlayerCharacters);
  }, []);

  function handleNext() {
    setActivePlayerIndex(
      (prevIndex) =>
        (prevIndex + 1) % (playerCharacters.length + nonPlayerCharacters.length)
    );
  }

  return (
    <div>
      {!isStarted ? (
        <form onSubmit={handleStart}>
          <table className="w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Initiative</th>
              </tr>
            </thead>
            <tbody>
              {playerCharacters.map((pc, index) => (
                <tr key={`pc${pc.id}-${index}`}>
                  <td>
                    <div className="flex items-center justify-between">
                      <span>{pc.pc_name}</span>
                      <Button
                        type="button"
                        className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => {
                          setPlayerCharacters((prevCharacters) =>
                            prevCharacters.filter((c) => c.id !== pc.id)
                          );
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                  <td>
                    <input
                      id={`pc-initiative-${pc.id}`}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      type="number"
                    />
                  </td>
                </tr>
              ))}
              {nonPlayerCharacters.map((npc, index) => (
                <tr key={`npc${npc.id}-${index}`}>
                  <td>
                    <div className="flex items-center justify-between">
                      <span>{npc.npc_name}</span>
                      <Button
                        onClick={() => {
                          setNonPlayerCharacters((prevCharacters) =>
                            prevCharacters.filter((c) => c.id !== npc.id)
                          );
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                  <td>
                    <input
                      id={`npc-initiative-${npc.id}`}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      type="number"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Button for kicking things off */}

          <Button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
          >
            Start Combat
          </Button>
        </form>
      ) : (
        // Button for advancing the actor marker

        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Initiative</th>
            </tr>
          </thead>
          <tbody>
            {/* <HighlightedRow className="active-row"> */}
            {[...playerCharacters, ...nonPlayerCharacters]
              .sort((a, b) => b.initiative - a.initiative)
              .map(
                (character, index) => (
                  console.log(
                    index,
                    activePlayerIndex,
                    index === activePlayerIndex
                  ),
                  (
                    <tr
                      key={character.id}
                      className={
                        index === activePlayerIndex ? "active-row" : ""
                      }
                    >
                      <td>{character.pc_name || character.npc_name}</td>
                      <td>{character.initiative}</td>
                    </tr>
                  )
                )
              )}

            <tr>
              <td>
                <Button
                  onClick={handleNext}
                  className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 sm:ml-3 sm:mt-0 sm:w-auto"
                >
                  Next Character
                </Button>

                {/* Button for when the encounter is over */}

                <Button
                  type="button"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 sm:ml-3 sm:mt-0 sm:w-auto"
                  onClick={() => {
                    setIsStarted(false);
                  }}
                >
                  End Combat
                </Button>
              </td>
            </tr>

            {/* </HighlightedRow> */}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TurnTracker;
