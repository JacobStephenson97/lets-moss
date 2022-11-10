import React, { useRef, useState } from "react";
import Button from "../../components/Button";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";

export default function Events() {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState("yyyy-MM-dd");
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
    <div className="m-auto my-auto flex w-10/12 flex-col justify-center sm:w-8/12 md:w-4/12">
      <div className="mt-4">
        <div className="flex flex-col justify-center">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-1 rounded-md border border-white bg-transparent text-center text-lg text-white focus:outline-none md:text-2xl"
            type="text"
            placeholder="Event Name"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col py-2 md:flex-row">
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
        <div className="flex flex-col py-2 md:flex-row">
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
