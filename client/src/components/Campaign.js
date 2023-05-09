import { useEffect, useState } from "react";
import CampaignDropdown from "./CampaignDropdown";

function Campaign() {
  const [campaignList, setCampaignList] = useState([]);
  const [newCampaignName, setNewCampaignName] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = {
        campaign_name: event.target.campaignName.value,
    };

    fetch("/campaign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data);
          event.target.reset();
          setNewCampaignName(data.campaign_name);
        });
      } else {
        response.json().then((err) => console.log(err.errors));
      }
    });
  }

  useEffect(() => {
    if (newCampaignName) {
      setCampaignList((prevCampaignList) => [...prevCampaignList, newCampaignName]);
      setNewCampaignName(null);
    }
  }, [newCampaignName]);

  useEffect(() => {
    fetch("/campaign")
      .then((response) => response.json())
      .then((data) => {
        setCampaignList(data.CampaignList);
      });
  }, []);

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-red-500">
          Campaigns
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Create new or Delete your old campaigns here.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-5 sm:flex sm:items-center">
          <div className="w-full sm:max-w-xs">
            <label htmlFor="campaign_name" className="sr-only">
              Campaign
            </label>
            <input
              type="text"
              name="campaignName"
              id="campaignName"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=" New Campaign"
            />
          </div>

          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
          >
            Save
          </button>
        </form>
        <CampaignDropdown campaignList={campaignList} />
      </div>
    </div>
  );
}

export default Campaign;
