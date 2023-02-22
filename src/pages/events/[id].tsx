import { useRouter } from "next/router";
import Calendar from "../../components/Calendar";
import { trpc } from "../../utils/trpc";

export default function Event() {
  const router = useRouter();
  const { id } = router.query;
  const query = trpc.event.getEvent.useQuery(
    { id: id as string },
    { enabled: router.isReady }
  );

  if (query.isLoading) {
    return <div>Loading...</div>;
  }
  if (query.isError) {
    return <div>Error</div>;
  }

  const getDateDiffInDays = (
    date1: Date | undefined,
    date2: Date | undefined
  ): number => {
    if (date2 === undefined || date1 === undefined) return 0;
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  if (
    query.data?.startDate === undefined ||
    query.data?.endDate === undefined
  ) {
    return <div>Error</div>;
  }
  return (
    <div className="m-auto my-4 flex flex-col justify-center">
      <h1 className=" text-3xl text-white">{query.data?.title}</h1>
      <Calendar
        startDate={query.data?.startDate}
        endDate={query.data?.endDate}
      />
      {/* <div className="grid grid-cols-7 gap-4">
        {new Array(
          getDateDiffInDays(query.data?.startDate, query.data?.endDate)
        )
          .fill(0)
          .map((_, i) => (
            <div
              className="border-1 border border-white p-4 text-white"
              key={i}
            >
              Hello
            </div>
          ))}
      </div> */}
    </div>
  );
}
