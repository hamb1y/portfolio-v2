const PAYLOAD_API = import.meta.env.PUBLIC_PAYLOAD_API_URL || 'http://localhost:3000'

export async function fetchPayload(path: string, token?: string) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const res = await fetch(`${PAYLOAD_API}/api${path}`)
    if (!res.ok) {
      throw new Error(`Payload API error: ${res.status}`)
    }
    return res.json()
  } catch (error) {
    console.error(`Fetch error for ${path}:`, error)
    throw error
  }
}

export async function getBlogs(limit?: number) {
  const query = limit ? `?limit=${limit}&sort=-date` : '?sort=-date'
  const data = await fetchPayload(`/blog${query}`)
  return data.docs || []
}

export async function getBlogBySlug(slug: string) {
  const data = await fetchPayload(`/blog?where[slug][equals]=${slug}`)
  return data.docs?.[0] || null
}

export async function getSkills() {
  const data = await fetchPayload('/skills')
  return data.docs || []
}

export async function getProjects() {
  const data = await fetchPayload('/projects')
  return data.docs || []
}
