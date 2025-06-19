import { UpvoteProvider } from "./stores/upvote";
import { UpvoteList } from "./ui/components/upvote/list";
import { Header } from "./ui/layout/header";

function App() {
  return (
    <UpvoteProvider>
      <Header />

      <main className="container w-full max-w-4xl mx-auto p-4">
        <UpvoteList />
      </main>
    </UpvoteProvider>
  );
}

export default App;
