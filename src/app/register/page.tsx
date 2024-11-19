"use client"
import { useRouter } from "next/navigation"
import addUser from "@/libs/addUser"

export default function RegisterPage() {
  
  const router = useRouter();

  let role = "user";

  async function toAddUser(addUserForm:FormData) {
    const name = addUserForm.get("name")?.toString() || ""
    const email = addUserForm.get("email")?.toString() || ""
    const tel = addUserForm.get("tel")?.toString() || ""
    const password = addUserForm.get("password")?.toString() || ""

    const UserInfo = [name,email,tel,role,password]

    const response = await addUser(UserInfo)
    if (response.success) {
      setTimeout(() => { router.push('/api/auth/signin') }, 1000);
      alert('Register success, please sign in');
    }

  }
  
  return(
    <main className="w-full flex flex-col items-center bg-white space-y-4 pt-2 pb-5">
      <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">
        Please, Fill In Your Information To Register
      </h1>
      
      <form action={toAddUser} className="w-full bg-slate-100 m-5 p-5 flex flex-col items-center space-y-5 py-10">
        
        <div className="w-1/4 grid gap-2">
          
          <label htmlFor="name">Name</label>
          <input type="text" required id="name" name="name" placeholder="User Name"
            className="bg-white border-2 border-gray-200 rounded w-full p-2
            text-gray-700 focus:outline-none focus:border-blue-400" />

        </div>

        <div className="w-1/4 grid gap-2">
          
          <label htmlFor="email">Email</label>
          <input type="email" required id="email" name="email" placeholder="User Email"
            pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
            title='Please add a valid email'
            className="bg-white border-2 border-gray-200 rounded w-full p-2
            text-gray-700 focus:outline-none focus:border-blue-400" />

        </div>

        <div className="w-1/4 grid gap-2">
          
          <label htmlFor="tel">Tel</label>
          <input type="text" required id="tel" name="tel" placeholder="Tel"
            pattern="^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$"
            title='Please add a valid telephone number'
            className="bg-white border-2 border-gray-200 rounded w-full p-2
            text-gray-700 focus:outline-none focus:border-blue-400" />

        </div>
        

        <div className="w-1/4 grid gap-2">
          
          <label htmlFor="password">Password</label>
          <input type="password" required id="password" name="password" placeholder="Password"
            minLength={6}
            className="bg-white border-2 border-gray-200 rounded w-full p-2
            text-gray-700 focus:outline-none focus:border-blue-400" />

        </div>

        <div className="w-1/4 grid gap-2">
          
          <label htmlFor="conPassword">Confirm Password</label>
          <input type="password" required id="conPassword" name="conPassword" placeholder="Confirm Password"
            className="bg-white border-2 border-gray-200 rounded w-full p-2
            text-gray-700 focus:outline-none focus:border-blue-400"
            onInput={(e) => {
              const password = (document.getElementById('password') as HTMLInputElement).value;
              const conPassword = (e.target as HTMLInputElement).value;
              if (conPassword !== password) {
                (e.target as HTMLInputElement).setCustomValidity('Passwords do not match');
              } else {
                (e.target as HTMLInputElement).setCustomValidity('');
              }
            }} />

        </div>
      
        <button type="submit" className="bg-sky-600 hover:bg-indigo-600 text-white p-2 rounded">
          Register
        </button>

      </form>
          
    </main>
  )
}