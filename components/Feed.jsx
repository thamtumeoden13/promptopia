'use client'

import { useRef, useState, useEffect } from "react"

import PromptCard from "./PromptCard"
import { useRouter } from "next/navigation"

const PromptCardList = ({ data, handleTagClick, handleUserClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleUserClick={handleUserClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const timeoutSearch = useRef(null)
  const router = useRouter()

  const [posts, setPosts] = useState([])

  const [searchText, setSearchText] = useState('')
  const [searchPosts, setSearchPosts] = useState([])

  const handleSearchChange = async (e) => {
    setSearchText(e.target.value)
  }

  const handleTagClick = async (tag) => {
    setSearchText(tag)
  }

  const handleUserClick = (post) => {
    console.log('handleUserClick', post)
    router.push(`/other-profile?id=${post.creator._id}&name=${post.creator.username}`)
    // router.push(`/update-prompt?id=${post._id}`)
  }

  useEffect(() => {

    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data || [])
    }

    fetchPosts()

  }, [])

  useEffect(() => {
    if (timeoutSearch.current) {
      clearTimeout(timeoutSearch.current)
    }
    timeoutSearch.current = setTimeout(async () => {
      const response = await fetch(`/api/prompt`, {
        method: 'POST',
        body: JSON.stringify({
          search_query: searchText,
        })
      })
      const data = await response.json()
      setSearchPosts(data || [])
    }, 500);
    return () => {
      clearTimeout(timeoutSearch.current)
    }
  }, [searchText])

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
        handleUserClick={handleUserClick}
      />
    </section>
  )
}

export default Feed