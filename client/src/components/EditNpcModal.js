import { useEffect, useState } from "react";

function EditNpcModal({ npc, onUpdate }) {
  const [npcs, setNpcs] = useState([]);
  const [npcList, setNpcList] = useState([]);
  const [error, setError] = useState(null);
  const [editingNpc, setEditingNpc] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    setEditingNpc(npc)
    setNewName(npc.npc_name)
  }, [npc])

  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const newName = event.target.elements["npc-name"].value;
    if (!newName) {
      return;
    }

    fetch(`/npc/${editingNpc.id}`, {
      method: "PATCH",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ npc_name: newName }),
    })
      .then((response) => {
        if (response.ok) {
          onUpdate({ ID: editingNpc.id, npc_name: newName})
        } else {
          throw new Error("Failed to update NPC");
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="npc-name"
                >
                  NPC Name
                </label>
                <input
                  type="text"
                  id="npc-name"
                  name="npc-name"
                  value={newName}
                  onChange={handleNameChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditNpcModal;
