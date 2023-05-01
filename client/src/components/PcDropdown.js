import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function PcDropdown() {
  const [pcs, setPcs] = useState([]);
  const [error, setError] = useState(null);
  const [editingPc, setEditingPc] = useState(null);

  useEffect(() => {
    fetch("/playercharacter")
      .then((response) => response.json())
      .then((data) => {
        setPcs(data.map(pc => [pc.id, pc.pc_name ]));
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleEditClick = (pcId) => {
    const pc = pcs.find((pc) => pc[0] === pcId);
    if (!pc) {
      return;
    }
    const newName = prompt(`Enter a new name for ${pc[1]}`);
    if (!newName) {
      return
    }
    fetch(`/playercharacter/${pcId}`, {
      method:'PATCH',
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ pc_name: newName }),
    })
    .then(response => {
      if (response.ok) {
        setPcs((prevPcs) =>
          prevPcs.map((pc) =>
           pc[0] === pcId ? [pcId, newName] : pc));
      } else {
        throw new Error('Failed to update PC')
      }
    })
    .catch(error => {
      setError(error)
    })
  }

  const handleDeleteClick = (pcId) => {
    fetch(`/playercharacter/${pcId}`, {
      method:'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setPcs((prevPcs) =>
          prevPcs.filter((pc) =>
           pc[0] !== pcId));
      } else {
        throw new Error('Failed to delete PC')
      }
    })
    .catch(error => {
      setError(error)
    })
  }

  return (
    <>
      {pcs.length > 0 && (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Player Character Name
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
            {pcs.length > 0 && (
              <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {pcs.map(pc => {
                    if (!pc[1]) {
                      return null;
                    }
                    return (
                      <Menu.Item key={`menu-${pc[0]}`}>
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
                            onClick={() => handleEditClick(pc[0])}
                          >
                            {pc[1]}
                          </button>
                          <button
                              href="#"
                              className="text-gray-400 hover:text-gray-500 w-5 h-5"
                              onClick={() => handleDeleteClick(pc[0])}
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

export default PcDropdown;
