import {
  getMakersMonitors,
  getModelsMonitors,
  getPlaces,
  getStates,
  getSubTypesMonitors,
} from "@/actions/monitors.action";
import FormMonitor from "../components/form-monitor";

const AddMonitorPage = async () => {
  const makers = await getMakersMonitors();
  const models = await getModelsMonitors();
  const places = await getPlaces();
  const states = await getStates();
  const subTypes = await getSubTypesMonitors();

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
