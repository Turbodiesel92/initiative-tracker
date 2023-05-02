import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NpcDropdown( { onNpcAdded }) {
  const [npcs, setNpcs] = useState([]);
  const [npcList, setNpcList] = useState([])
  const [error, setError] = useState(null);
  const [editingNpc, setEditingNpc] = useState(null);

  useEffect(() => {
    fetch("/npc")
      .then((response) => response.json())
      .then((data) => {
        setNpcs(data.map(npc => [npc.id, npc.npc_name ]));
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleEditClick = (npcId) => {
    const npc = npcs.find((npc) => npc[0] === npcId);
    if (!npc) {
      return;
    }
    const newName = prompt(`Enter a new name for ${npc[1]}`);
    if (!newName) {
      return
    }
    fetch(`/npc/${npcId}`, {
      method:'PATCH',
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ npc_name: newName }),
    })
    .then(response => {
      if (response.ok) {
        setNpcs((prevNpcs) =>
          prevNpcs.map((npc) =>
           npc[0] === npcId ? [npcId, newName] : npc));
      } else {
        throw new Error('Failed to update NPC')
      }
    })
    .catch(error => {
      setError(error)
    })
  }

  const handleDeleteClick = (npcId) => {
    fetch(`/npc/${npcId}`, {
      method:'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setNpcs((prevNpcs) =>
          prevNpcs.filter((npc) =>
           npc[0] !== npcId));
      } else {
        throw new Error('Failed to delete NPC')
      }
    })
    .catch(error => {
      setError(error)
    })
  }

  return (
    <>
      {npcs.length > 0 && (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              NPC Name
              <ChevronDownIcon
                className="-mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            {npcs.length > 0 && (
              <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {npcs.map(npc => {
                    if (!npc[1]) {
                      return null;
                    }
                    return (
                      <Menu.Item key={`menu-${npc[0]}`}>
                        {({ active }) => (
                          <div className="flex items-Center justify-between">
                          <button
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-grey-900"
                                : "text-grey-700",
                              "block px-4 py-2 text-sm"
                            )}
                            onClick={() => handleEditClick(npc[0])}
                          >
                            {npc[1]}
                          </button>
                          <button
                              href="#"
                              className="text-gray-400 hover:text-gray-500 w-5 h-5"
                              onClick={() => handleDeleteClick(npc[0])}
                              >
                                <TrashIcon />
                              </button>
                              </div>
                        )}
                      </Menu.Item>
                    )
                  })}
                </div>
              </Menu.Items>
            )}
          </Transition>
        </Menu>
      )}
    </>
  );
}

export default NpcDropdown;
