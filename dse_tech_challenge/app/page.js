export default function Home() {
  // const handleClick = async () => {
  //   try {
  //     const response = await fetch()
  //   }
  // }
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
       Hello! Welcome to the Gusto sandbox hosted by Finch
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
       Create Gusto Sandbox now!
      </div>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
  Create
</button>

    </main>
  );
}
