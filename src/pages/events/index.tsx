import React, { useRef, useState } from "react";
import Button from "../../components/Button";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";

type ErrorType = {
  title?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
};

export default function Events() {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<ErrorType>({});

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
    if (validateForm())
      mutation.mutate({
        title,
        startDate,
        endDate,
        description,
      });
  };

  const validateForm = () => {
    const errorObj: ErrorType = {};
    if (title.length < 1) {
      errorObj.title = "Title is required";
    }
    if (isNaN(new Date(endDate).getTime())) {
      errorObj.endDate = "End date is required";
    }
    if (new Date(endDate) < new Date(startDate)) {
      errorObj.endDate = "End date must be after start date";
    }
    console.log(isNaN(new Date(endDate).getTime()));
    if (Object.keys(errorObj).length > 0) {
      setError(errorObj);
      return false;
    }
    return true;
  };

  console.log(error);
  return (
    <div className="m-auto my-auto flex w-10/12 flex-col justify-center sm:w-8/12 md:w-4/12">
      <div className="mt-4">
        <div className="flex flex-col justify-center">
          <input
            value={title}
            onChange={(e) => {
              if (error.title && e.target.value.length > 0) {
                setError({ ...error, title: undefined });
              }
              setTitle(e.target.value);
            }}
            className={`border-1 rounded-md border ${
              error.title ? "border-red-600" : "border-white"
            } bg-transparent p-1 text-2xl text-white focus:outline-none md:text-2xl`}
            type="text"
            placeholder="Event Name"
          />
          {error.title && (
            <div className="text-sm text-red-600"> {error.title} </div>
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex w-5/12 flex-col py-2">
          <label htmlFor="start-date" className="mr-2 text-white">
            Start Date
          </label>
          <input
            min={new Date().toISOString().split("T")[0]}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            type={"date"}
            id="start-date"
          />
          {error.startDate && (
            <div className="text-sm text-red-600"> {error.startDate} </div>
          )}
        </div>
        <div className="flex w-5/12 flex-col py-2">
          <label htmlFor="end-date" className="mr-2 text-white">
            End Date
          </label>
          <input
            min={startDate}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            type={"date"}
            id="end-date"
          />
          {error.endDate && (
            <div className="text-xs text-red-600 md:text-sm">
              {error.endDate}
            </div>
          )}
        </div>
      </div>
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-1 w-full resize-none rounded-md border border-white bg-inherit p-1 text-white shadow-inner focus:outline-none"
          placeholder="Description"
        />
      </div>

      <Button label="Create Event" onClick={handleSubmit} />
    </div>
  );
}
