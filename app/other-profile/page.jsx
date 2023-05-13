'use client'

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Profile from "@components/Profile"
import { useSession } from "next-auth/react"

const OtherProfile = () => {

    const [posts, setPosts] = useState([])

    const searchParams = useSearchParams()
    const userId = searchParams.get('id')
    const userName = searchParams.get('name')

    useEffect(() => {
        const getPromptsByUserId = async () => {
            const response = await fetch(`/api/users/${userId}/posts`)
            const data = await response.json()

            setPosts(data)
        }
        if (userId) getPromptsByUserId()
    }, [userId])
    console.log('posts', posts)
    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName} personalized profile page`}
            data={posts}
        />
    )
}

export default OtherProfile