import { cn } from "@/lib/utils";
import type { UpvoteList } from "@/stores/upvote/types";
import { ArrowUpIcon } from "lucide-react";
import { Button } from "../button";

type UpvoteItemProps = Pick<UpvoteList, "isSelected"> & {
  toggleList: VoidFunction;
};

export const UpvoteItem = ({ isSelected, toggleList }: UpvoteItemProps) => {
  return (
    <Button
      size="icon"
      variant="outline"
      type="button"
      className={cn(
        isSelected ? "bg-primary-foreground text-primary" : "text-secondary bg-secondary-foreground",
        "hover:bg-primary-foreground hover:text-primary",
      )}
      onClick={toggleList}
    >
      <ArrowUpIcon />
    </Button>
  );
};
