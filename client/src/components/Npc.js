import { useEffect, useState } from "react";
import NpcDropdown from "./NpcDropdown";
import CampaignDropdown from "./CampaignDropdown";

function NonPlayerCharacter() {
  const [npcList, setNpcList] = useState([]);
  const [newNpcName, setNewNpcName] = useState(null);
  const [activeCampaign, setActiveCampaign] = useState(null);
  // const [selectedCampaignId, setSelectedCampaignId] = useState(null)
  // function handleCampaignChange(campaignId) {
  //   setActiveCampaign(campaignId)
  // }


  function handleSubmit(event) {
    event.preventDefault();

    // if (!activeCampaign) {
    //   console.log('please select a campaign');
    //   return;
    // }

    const formData = {
      npc_name: event.target.npcName.value,
      campaign_id: activeCampaign,
    };
    console.log('Form data:', formData)

    fetch("/npc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      console.log('POST response:', response)
      if (response.ok) {
        response.json().then((data) => {
          console.log(data);
          event.target.reset();
          setNewNpcName(data.npc_name);

          fetch(`/campaign/${activeCampaign}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: data.campaign_name }),
          }).then((response) => {
            console.log('PATCH response:', response)
            if (response.ok) {
              response.json().then((data) => {
                console.log(data);
              })
            } else {
              response.json().then((err) => console.log(err.errors))
            }
          })
          .catch((error) => console.log(error))
        });
      } else {
        response.json().then((err) => console.log(err.errors));
      }
    });
  }

  useEffect(() => {
    if (newNpcName) {
      setNpcList((prevNpcList) => [...prevNpcList, newNpcName]);
      setNewNpcName(null);
    }
  }, [newNpcName]);

  useEffect(() => {
    if (activeCampaign) {
      fetch(`/npc?campaign_id=${activeCampaign}`)
       .then((response) => response.json())
       .then((data) => {
         setNpcList(data.npcList);
        });
      }
    }, [activeCampaign]);



  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-red-500">
          Non Player character name
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Add, Edit, and Delete Non Player Character names here.</p>
        </div>
        <CampaignDropdown activeCampaign={activeCampaign} setActiveCampaign={setActiveCampaign} />
        <form onSubmit={handleSubmit} className="mt-5 sm:flex sm:items-center">
          <div className="w-full sm:max-w-xs">
            <label htmlFor="npc_name" className="sr-only">
              Npc name
            </label>
            <input
              type="text"
              name="npcName"
              id="npcName"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=" Non Player character name"
            />
          </div>

          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
          >
            Save
          </button>
        </form>
        <NpcDropdown npcList={npcList} />
      </div>
    </div>
  );
}

export default NonPlayerCharacter;
