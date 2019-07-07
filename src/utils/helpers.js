export const apiRequest = async (
  url,
  method = 'POST',
  bodyParams = {},
  token = ''
) => {
  const headers = token
    ? { 'Content-Type': 'application/json', token: token }
    : { 'Content-Type': 'application/json' };

  const response = await fetch(url, {
    method,
    headers,
    body: bodyParams ? JSON.stringify(bodyParams) : undefined
  });

  return await response.json();
};
