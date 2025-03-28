import Cabin from "@/components/Cabin";
import Spinner from "@/components/Spinner";
import { getCabin, getCabins } from "@/lib/data-service";
import { Suspense } from "react";
import Reservation from "@/components/Reservation";

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return { title: `cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => {
    return {
      cabinId: String(cabin.id),
    };
  });

  return ids;
}

// PLACEHOLDER DATA

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
