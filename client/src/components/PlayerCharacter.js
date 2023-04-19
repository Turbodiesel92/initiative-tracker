import { useState, useEffect } from "react";

function PlayerCharacter() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // fetching the charters from the db
  useEffect(() => {
    fetch("/playercharacter")
      .then((response) => response.json())
      .then((data) => setCharacters(data));
  }, []);

  // edit handler

  function handleEdit(id) {
    fetch(`/playercharacter/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedCharacter(data);
      });
  }

  // handle add or update character

  function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      pc_name: event.target.pcName.value,
    };

    // if there is a selected character - update - if no character - add new

    if (selectedCharacter) {
      fetch(`/playercharacter/${selectedCharacter.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((response) => {
        if (response.ok) {
          setCharacters((prevCharacters) =>
            prevCharacters.map((character) =>
              character.id === selectedCharacter.id
                ? { ...character, pc_name: formData.pc_name }
                : character
            )
          );
          event.target.reset();
          setSelectedCharacter(null);
        } else {
          response.json().then((err) => console.log(err.errors));
        }
      });
    } else {
      fetch("/playercharacter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setCharacters((prevCharacters) => [...prevCharacters, data]);
            event.target.reset();
          });
        } else {
          response.json().then((err) => console.log(err.errors));
        }
      });
    }
  }

  return (

    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-red-500">
          Players character name
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Add characters here.</p>
        </div>

        <form
          onSubmit={selectedCharacter ? handleEdit : handleSubmit}
          className="mt-5 sm:flex sm:items-center"
        >
          <div className="w-full sm:max-w-xs">
            <label htmlFor="pc_name" className="sr-only">
              Player Character Name
            </label>
            <select
          value={selectedCharacter ? selectedCharacter.pc_name : ""}
          onChange={(event) => {
            setSelectedCharacter({ id: null, pc_name: event.target.value });
          }}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">Select a character</option>
          {characters.map((name) => (
            <option key={name.id} value={name.pc_name}>
              {name.pc_name}
            </option>
          ))}
        </select>
            <input
              type="text"
              name="pcName"
              id="pcName"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="character name"
              defaultValue={selectedCharacter ? selectedCharacter.pc_name : ""}
            />
          </div>

          {selectedCharacter ? (
            <div className="mt-3 flex">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          ) : (
            <button
              type="submit"
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
            >
              Add Character
            </button>
          )}

        </form>

      </div>
    </div>
  );
}

export default PlayerCharacter;
