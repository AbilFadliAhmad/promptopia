'use client';
import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}
const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const handleSearchChange = async(e) => {
    setSearchText(e.target.value)
    const res = await fetch(`/api/prompt/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        search: e.target.value
      })
    })
    const data = await res.json()
    setPosts(data)
    // setPosts(posts.filter)
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('api/prompt');
        const data = await res.json();
        setPosts(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchPosts();
  }, []);

  useEffect(()=>{

  },[])

  return (
    <section className="feed w-full flex flex-col items-center">
      <form className="flex relative w-full max-w-2xl gap-5 flex-center mx-auto">
        <input 
        type="text" 
        name="" 
        placeholder="Search for a tag or a username" 
        className="search_input peer" 
        id=""
        value={searchText} 
        onChange={handleSearchChange}
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  );
};

export default Feed;
