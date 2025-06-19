import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const Card = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className)}
    {...props}
  />
);

const CardHeader = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
};

const CardTitle = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("leading-none font-semibold", className)} {...props} />
);

const CardDescription = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("text-muted-foreground text-sm", className)} {...props} />
);

const CardContent = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("px-6", className)} {...props} />
);

export { Card, CardContent, CardDescription, CardHeader, CardTitle };
