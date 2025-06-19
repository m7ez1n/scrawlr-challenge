import { cn } from "@/lib/utils";
import { useUpvotes } from "@/stores/upvote";
import { Button } from "@/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/components/card";
import { ListIcon, ListRestartIcon, PlusIcon, SearchIcon } from "lucide-react";
import { EmptyState } from "../empty-state";
import { UpvoteItem } from "./item";

export const UpvoteList = () => {
  const { filteredLists, toggleList, addUpvote, createList, dispatch } = useUpvotes();

  if (!filteredLists.length) {
    return (
      <EmptyState
        title="No lists found"
        description="Try adjusting your search or filter to find what you're looking for."
        icons={[SearchIcon, ListIcon, PlusIcon]}
      />
    );
  }

  return (
    <Card className="h-[calc(100vh-8rem)] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Upvotes list</CardTitle>

        <div className="flex flex-row items-center gap-2">
          <Button size="sm" variant="default" aria-label="Add list" onClick={createList}>
            Add list
          </Button>

          <Button
            size="icon"
            variant="destructive"
            aria-label="Reset all lists"
            onClick={() => dispatch({ type: "RESET_ALL" })}
          >
            <ListRestartIcon />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto">
        {filteredLists.map(({ id, isSelected, upvotes }) => (
          <div key={id} className="mb-6">
            <div className="flex flex-col gap-1 mb-2">
              <CardDescription>
                List with id: <span className="font-bold">{id}</span>
              </CardDescription>
              <CardDescription className="text-sm text-gray-400">
                Quantity: <span className="font-bold">{upvotes.length}</span>
              </CardDescription>
            </div>

            <div className="flex w-full items-center gap-2">
              <div
                className={cn(
                  "flex flex-wrap border rounded-md p-2 gap-2 flex-1 transition-all duration-300",
                  isSelected ? "border-primary" : "border-gray-200",
                )}
              >
                {upvotes.length ? (
                  upvotes.map((item) => (
                    <UpvoteItem key={item.id} isSelected={isSelected} toggleList={() => toggleList(id)} />
                  ))
                ) : (
                  <div className="flex flex-row items-center gap-2 mx-auto py-1">
                    <span className="text-xs text-gray-400">No upvotes yet</span>
                    <span className="text-xs text-gray-300">|</span>
                    <span className="text-xs text-gray-300">Click + to add one</span>
                  </div>
                )}
              </div>

              <Button size="icon" aria-label="Add upvote" variant="outline" onClick={() => addUpvote(id)}>
                <PlusIcon />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
