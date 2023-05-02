import { useEffect, useState } from 'react'
import PcDropdown from "./PcDropdown";

function PlayerCharacter() {
  const [pcList, setPcList] = useState([])
  const [newPcName, setNewPcName] = useState(null)

function handleSubmit(event) {
  event.preventDefault();
  const formData = {
    pc_name: event.target.pcName.value,
  };

  fetch("/playercharacter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        console.log(data);
        event.target.reset()
        setNewPcName(data.pc_name)
      });
    } else {
      response.json().then((err) => console.log(err.errors));
    }
  });
}

  useEffect(() => {
    if (newPcName) {
      setPcList((prevPcList) => [...prevPcList, newPcName])
      setNewPcName(null)
    }
  }, [newPcName])

  useEffect(() => {
    fetch('/playercharacter')
    .then((response) => response.json())
    .then((data) => {
      setPcList(data.pcList)
    })
  }, [])

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-red-500">
          Player character name
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Add, Edit, and Delete Player Character names here.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-5 sm:flex sm:items-center">
          <div className="w-full sm:max-w-xs">
            <label htmlFor="pc_name" className="sr-only">
              Player character name
            </label>
            <input
              type="text"
              name="pcName"
              id="pcName"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=" Player character name"
            />
          </div>

          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
          >
            Save
          </button>
        </form>
        <PcDropdown pcList={pcList} />
      </div>
    </div>
  );
}

export default PlayerCharacter;
