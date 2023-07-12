import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { useInterventionContext } from "../../contexts/InterventionContext";
import APIService from "../../services/APIService";
import ProtocolStats from "../../components/user/protocols/ProtocolStats";
import ProtocolCard from "../../components/user/dashboard/ProtocolCard";
import ItemCard from "../../components/user/protocols/ItemCard";
import countdown, { getProgressionBackground } from "../../services/utils";
import BackSvg from "../../components/svg/BackSvg";

export default function Protocols() {
  const { user } = useUserContext();
  const { protocols } = useInterventionContext();
  const { id } = useParams();
  const [protocolDetails, setProtocolsDetails] = useState(null);
  const [activeProtocol, setActiveProtocol] = useState(null);
  const [mobileView, setMobileView] = useState(false);

  // Set Initial Protocol with ID in params
  const setInitialProtocol = () => {
    if (protocols)
      setActiveProtocol(
        protocols.filter((protocol) => protocol.protocol_id === Number(id))
      );
  };

  // Fetch Items based on Protocol ID in params
  const fetchItemsDetails = () => {
    APIService.get(`/items/${id}`)
      .then((res) => setProtocolsDetails(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    setInitialProtocol();
    fetchItemsDetails();
  }, [id]);

  // Determine if Window is Desktop or Mobile
  const handleResize = () => {
    setMobileView(window.innerWidth <= 768);
  };

  // Listen to Window Resize each time it being resized
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Determine actual window size
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="min-w-screen relative mb-6 flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:mb-0 lg:py-16 lg:pl-72 lg:pr-12">
      <div className="mb-4 mt-2 flex h-fit w-full items-center justify-between lg:mb-8">
        <div className="flex flex-row items-center">
          <button
            type="button"
            className="mr-2 px-2 text-gray-500 lg:hidden"
            onClick={() => window.history.back()}
          >
            <BackSvg />
          </button>
          <h3 className="text-2xl font-semibold lg:text-4xl">Ma préparation</h3>
        </div>
        <div className="ml-auto hidden flex-row items-center gap-2 lg:flex">
          <div className="flex flex-col items-end">
            <p className="line-clamp-1 text-base font-semibold text-violet-dark-0">
              {user.operation_name}
            </p>
            <p className="text-xs italic">
              Par {user.practitioner_surname}, le{" "}
              <span className="font-semibold">
                {new Date(user.intervention_date).toLocaleDateString()}
              </span>
            </p>
          </div>
          <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-red-100">
            <p className="text-xs italic opacity-60">Jours</p>
            <p className="text-base font-semibold">
              {countdown(user.intervention_date)}
            </p>
          </div>
        </div>
      </div>
      <ul
        className={`my-2 grid grid-cols-1 items-center justify-between gap-4 lg:grid-cols-${protocols?.length}`}
      >
        {protocols &&
          protocols
            .filter((protocol) =>
              activeProtocol && mobileView
                ? protocol.protocol_id === activeProtocol[0]?.protocol_id
                : protocols
            )
            .map((protocol) =>
              activeProtocol && !mobileView ? (
                <ProtocolStats key={protocol.protocol_id} data={protocol} />
              ) : (
                <ProtocolCard key={protocol.protocol_id} data={protocol} />
              )
            )}
      </ul>
      <div className="mt-4">
        {activeProtocol && (
          <ul
            className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 lg:rounded-lg lg:bg-gray-200 lg:p-8 lg:outline lg:outline-4"
            style={{
              outlineColor: `${getProgressionBackground(
                activeProtocol[0]?.color_theme
              )}`,
            }}
          >
            {protocolDetails?.map((item) => (
              <ItemCard key={item.item_id} data={item} />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
