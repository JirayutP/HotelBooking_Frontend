export default async function addUser(UserInfo:string[]) {

  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "name": UserInfo[0],
      "email": UserInfo[1],
      "tel": UserInfo[2],
      "role": UserInfo[3],
      "password": UserInfo[4]
    }),
  })

  if (!response.ok) {
    alert("Failed to register user");
  }
  return await response.json();

}