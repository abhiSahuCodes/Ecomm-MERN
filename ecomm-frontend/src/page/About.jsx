

const About = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex-col min-h-[20rem] min-w-[40%] mt-10 px-10 bg-blue-300 rounded-[1rem] shadow-2xl text-slate-700 mx-auto text-center text-2xl font-semibold flex items-center justify-center">
        <h1>About</h1>
        <div className="mx-auto">
        <p className="text-lg">Signup and login</p>
        <p className="text-lg">Only use admin email and password to add new product</p>
        <p className="text-lg">email- adminabhishek@gmail.com and password- admin12345</p>
        <p className="text-lg">Upon login the the admin can see the New Product option above logout option.</p>
      </div>
      </div>
    </div>
  )
}

export default About