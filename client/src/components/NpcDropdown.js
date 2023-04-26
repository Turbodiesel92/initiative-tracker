import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function NpcDropdown() {
  const [npcs, setNpcs] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/npc')
      .then(response => response.json())
      .then(data => {
        setNpcs(data)
        console.log('npcs:', data)
      })
      .catch(error => console.log(error))
  }, [])


  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
        {npcs.length> 0 &&

    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          NPC Name
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
        <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {npcs.map(npc => (
                <Menu.Item key={npc.id}>
                {({ active }) => (
                  <button
                    href='#'
                    className={classNames(
                        active ? "bg-gray-100 text-grey-900" : "text-grey-700", 'block px-4 py-2 text-sm'
                )}
                    >
                    {npc.name}
                  </button>
                    )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    }
    </>
  )
}

export default NpcDropdown
