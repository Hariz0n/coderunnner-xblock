import { getCookie } from "@/shared";

export const fetchData = async (url: string): Promise<Problem> => {
  const csrfToken = getCookie('csrftoken')
  console.log(csrfToken)

  const data = await fetch(url, {
    method: 'POST',
    headers: csrfToken ? {
      'X-CSRFToken': csrfToken
    } : undefined,
    body: JSON.stringify({})
  })

  return data.json();
}