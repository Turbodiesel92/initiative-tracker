import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CampaignDropdown() {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/campaign")
      .then((response) => response.json())
      .then((data) => {
        setCampaigns(
          data.map((campaign) => ({
            id: campaign.id,
            name: campaign.campaign_name,
          }))
        );
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleDeleteClick = (campaignId) => {
    fetch(`/campaign/${campaignId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setCampaigns((prevCampaigns) =>
            prevCampaigns.filter((campaign) => campaign.id !== campaignId)
          );
        } else {
          throw new error("Failed to delete Campaign");
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Campaigns
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
        <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {campaigns.map((campaign) => (
              <Menu.Item key={campaign.id}>
                {({ active }) => (
                  <div className="flex items-Center justify-between">
                    <a
                      href={campaign.url}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      {campaign.name}
                    </a>
                    <button
                      href="#"
                      className="text-gray-400 hover:text-gray-500 w-5 h-5"
                      onClick={() => handleDeleteClick(campaign.id)}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default CampaignDropdown;
