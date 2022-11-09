import { useRouter } from "next/router";

export default function Event() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Event {id}</h1>
    </div>
  );
}
