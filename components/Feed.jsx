'use client'

import { useRef, useState, useEffect } from "react"

import PromptCard from "./PromptCard"

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
  )
}

const Feed = () => {

  const timeoutSearch = useRef(null)

  const [posts, setPosts] = useState([])

  const [searchText, setSearchText] = useState('')
  const [searchPosts, setSearchPosts] = useState([])

  const handleSearchChange = async (e) => {
    const text = e.target.value
    setSearchText(text)

    if (timeoutSearch.current) {
      clearTimeout(timeoutSearch.current)
    }

    timeoutSearch.current = setTimeout(async () => {
      const response = await fetch(`/api/prompt`, {
        method: 'GET',
        body: JSON.stringify({
          search_query: text,
        })
      })
      const data = await response.json()
      setSearchPosts(data || [])
    }, 500);

  }

  const handleTagClick = async (tag) => {

  }

  useEffect(() => {

    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data || [])
    }

    fetchPosts()

  }, [])

  return (
    <section className="feed">
      <form
        className="relative w-full flex-center"
      >
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={searchText ? searchPosts : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed