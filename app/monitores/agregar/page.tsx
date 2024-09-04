import FormMonitor from "../components/form-monitor";
import { getStates } from "@/actions/state.action";
import { getPlaces } from "@/actions/place.action";
import { getMakers } from "@/actions/makers.action";
import { getModels } from "@/actions/models.action";
import { getSubtypes } from "@/actions/subtypes.action";

const AddMonitorPage = async () => {
  const makers = await getMakers("monitor");
  const models = await getModels("monitor");
  const subTypes = await getSubtypes("monitor");
  const places = await getPlaces();
  const states = await getStates();

  return (
    <section className="container mt-10 p-6">
      <h2 className="text-2xl font-semibold text-center">Agregar Monitor</h2>
      <FormMonitor
        makers={makers}
        places={places}
        states={states}
        models={models}
        subTypes={subTypes}
      />
    </section>
  );
};
export default AddMonitorPage;
