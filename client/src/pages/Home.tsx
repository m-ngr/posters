import { useEffect, useState } from "react";
import Poster, { IPost } from "../components/Poster";

export default function Home() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("http://localhost:4000/api/posts");

      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    };
    fetchPosts();
  }, []);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      {posts.map((p) => (
        <Poster
          post={p}
          handleChange={handleChange}
          expanded={expanded}
          key={p._id}
        />
      ))}
    </div>
  );
}
