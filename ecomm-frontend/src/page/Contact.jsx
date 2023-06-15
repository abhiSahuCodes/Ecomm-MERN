

const Contact = () => {
  return (
    <div>
      <div className="flex flex-col gap-10">
      <div className="flex-col min-h-[20rem] min-w-[40%] mt-10 px-10 bg-blue-300 rounded-[1rem] shadow-2xl text-slate-700 mx-auto text-center text-2xl font-semibold flex items-center justify-center">
        <h1>Contact</h1>
        <div className="mx-auto">
        <p className="text-lg">Email: abhishek963sahu@gmail.com</p>
        <p className="text-lg">LinkedIn: <a href="https://www.linkedin.com/in/abhishek-sahu-403977257/"className="text-md underline text-blue-800">Link</a></p>
        <p className="text-lg">Github: <a href="" className="text-md underline text-blue-800">Link</a></p>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Contact