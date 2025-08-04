import { calculateTrendPercentage } from "~/lib/utils";
import { cn } from "~/lib/utils";

const StatsCard = ({
  headerTitle,
  total,
  lastMonthCount,
  currentMonthCount,
}: StatsCard) => {
  const { trend, percentage } = calculateTrendPercentage(
    currentMonthCount,
    lastMonthCount
  );

  const isDecrement = trend === "decrement";

  return (
    <article className="stats-card">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-gray-500">{headerTitle}</h3>
          <h2 className="text-2xl md:text-3xl font-bold text-dark-100">{total.toLocaleString()}</h2>
        </div>
        
        <div className="flex-shrink-0 w-24 h-16 overflow-hidden">
          <img
            src={`/assets/icons/${isDecrement ? "decrement.svg" : "increment.svg"}`}
            alt="trend graph"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <figure className="flex items-center gap-1">
          <img
            src={`/assets/icons/${isDecrement ? "arrow-down-red.svg" : "arrow-up-green.svg"}`}
            alt="arrow"
            className="size-4"
          />
          <figcaption
            className={cn(
              "text-xs font-semibold",
              isDecrement ? "text-red-500" : "text-success-700"
            )}
          >
            {Math.round(percentage)}%
          </figcaption>
        </figure>
        <p className="text-xs text-gray-100">vs last month</p>
      </div>
    </article>
  );
};

export default StatsCard;
