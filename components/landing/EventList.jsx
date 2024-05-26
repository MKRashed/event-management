import { getAllEvents } from "@/db/queries";
import EventCard from "./EventCard";
const EventList = async ({ query }) => {
  console.log({query});
  const allEvents = await getAllEvents('enven');
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {allEvents.map((item) => (
        <EventCard key={item.id} event={item} />
      ))}
    </div>
  );
};

export default EventList;
