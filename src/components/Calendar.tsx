import { start } from "repl";

type CalendarProps = {
  startDate: Date;
  endDate: Date;
};

export default function Calendar({
  startDate,
  endDate,
}: CalendarProps): JSX.Element {
  const monthYear = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(startDate);

  const lastDayOfStartMonth = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    0
  );
  const firstDayOfStartMonth = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    1
  );
  console.log(firstDayOfStartMonth.getDay());
  return (
    <div className="border-1 h-full w-full border border-white text-white">
      <div className="py-6 text-center text-3xl">{monthYear}</div>
      <div>
        <div className="grid grid-cols-7  gap-4 p-4 text-center">
          <div className="h-1">Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>

        <div className="grid grid-cols-7 grid-rows-5 gap-4 p-4">
          {
            //offset days
            new Array(firstDayOfStartMonth.getDay()).fill(0).map((i) => (
              <div key={i}></div>
            ))
          }
          {new Array(lastDayOfStartMonth.getDate()).fill(0).map((_, i) => (
            <div key={i} className="border-1 boder-white  border">
              <div className="">{i + 1}</div>
              <div className="h-36"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
