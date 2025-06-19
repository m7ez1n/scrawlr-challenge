import { useUpvotes } from "@/stores/upvote";
import { buttonVariants } from "@/ui/components/button";
import { Input } from "@/ui/components/input";
import { LinkIcon } from "lucide-react";

export const Header = () => {
  const { search, setSearch } = useUpvotes();

  return (
    <header className="p-3 bg-white border-b border-gray-200">
      <div className="container w-full max-w-4xl mx-auto flex items-center justify-between">
        <img src="/assets/scrawlr-logo.png" alt="Scrawlr Logo" className="h-7" />

        <Input
          placeholder="Search list by id"
          className="w-full text-secondary/70 max-w-52 sm:max-w-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <a
          href="https://github.com/m7ez1n/scrawlr-challenge"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "outline", size: "icon" })}
        >
          <LinkIcon size={12} />
        </a>
      </div>
    </header>
  );
};
