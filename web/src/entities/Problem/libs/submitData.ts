import { getCookie } from "@/shared";

export const submitData = async (
  url: string,
  body: Problem.Answer
): Promise<Problem.Data> => {
  const csrfToken = getCookie("csrftoken");

  const data = await fetch(url, {
    method: "POST",
    headers: csrfToken
      ? {
          "X-CSRFToken": csrfToken,
        }
      : undefined,
    body: JSON.stringify(body),
  });

  return data.json();
};
