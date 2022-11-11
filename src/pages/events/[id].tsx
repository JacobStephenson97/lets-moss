import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

export default function Event() {
  const router = useRouter();
  const { id } = router.query;
  const query = trpc.event.getEvent.useQuery({ id: id as string });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }
  if (query.isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h1 className="text-3xl text-white">{query.data?.title}</h1>
    </div>
  );
}
