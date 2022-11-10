import React, { useRef, useState } from "react";
import Button from "../../components/Button";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";

export default function Events() {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState("YYYY-MM-DD");
  const [title, setTitle] = useState("");

  const router = useRouter();
  const mutation = trpc.event.eventCreate.useMutation({
    onSuccess: (data) => {
      router.push(`/events/${data?.id}`);
    },
  });

  if (!startDate) {
    return <div></div>;
  }

  const handleSubmit = async () => {
    mutation.mutate({
      title,
      startDate,
      endDate,
    });
  };

  return (
    <div className="m-auto my-auto flex w-4/12 flex-col justify-center">
      <div className="mt-4">
        <div className="flex flex-col justify-center">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-1 rounded-md border border-white bg-transparent text-center text-2xl text-white focus:outline-none"
            type="text"
            placeholder="Event Name"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="py-2">
          <label htmlFor="start-date" className="mr-2 text-white">
            Start Date
          </label>
          <input
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            type={"date"}
            id="start-date"
          />
        </div>
        <div className="py-2">
          <label htmlFor="end-date" className="mr-2 text-white">
            End Date
          </label>
          <input
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            type={"date"}
            id="end-date"
          />
        </div>
      </div>
      <Button label="Create Event" onClick={handleSubmit} />
    </div>
  );
}
