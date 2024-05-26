import EventDetails from "@/components/details/EventDetails";
import EventVenue from "@/components/details/EventVenue";
import HeroSection from "@/components/details/HeroSection";
import { getEvent } from "@/db/queries";
const EventDetailsPage = async ({ params: { id } }) => {
  const event = await getEvent(id);
  return (
    <>
      <HeroSection eventInfo={event} />
      <section class="container">
        <div class="grid grid-cols-5 gap-12 my-12">
          <EventDetails details={event?.details} swags={event?.swags} />
          <EventVenue location={event?.location} />
        </div>
      </section>
    </>
  );
};

export default EventDetailsPage;
