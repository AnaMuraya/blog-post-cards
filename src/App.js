import { useEffect, useState } from "react";

import Card from "./components/Card";

import "./App.scss";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json`
        );
        const data = await response.json();
        const cleanData = data.map((item) => {
          const id = item.id;
          const url = item.link;
          const title = item.title.rendered || " ";
          const postType = item.type;
          const postGroup = item._embedded["wp:term"][3][0]?.name || " ";
          const postGroupSlug = item._embedded["wp:term"][3][0]?.slug || "";
          const timeStamp = new Date(item.date).toUTCString();
          const authorName = item._embedded.author[0].name;
          const authorLink = item._embedded.author[0].link;
          let postFeaturedMediaAlt,
            postFeaturedMediaLink = "";
          const postFeaturedMedia = item.featured_media;

          if (
            item._embedded["wp:featuredmedia"] &&
            item._embedded["wp:featuredmedia"][0]
          ) {
            postFeaturedMediaAlt =
              item._embedded["wp:featuredmedia"][0].alt_text || "";

            postFeaturedMediaLink =
              item._embedded["wp:featuredmedia"][0].link || "";
          }

          return {
            id,
            url,
            title,
            postType,
            postGroup,
            postGroupSlug,
            timeStamp,
            authorName,
            authorLink,
            postFeaturedMedia,
            postFeaturedMediaAlt,
            postFeaturedMediaLink,
          };
        });

        setPosts(cleanData);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <div className="row">
        {posts.length !== 0 &&
          posts.map((post) => <Card {...post} key={post.id} />)}
      </div>
    </div>
  );
}

export default App;
