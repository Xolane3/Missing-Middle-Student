export default function TechnicianLogin() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Technician Login</h1>
        <form className="flex flex-col gap-2 w-1/3">
          <input type="email" placeholder="Technician Email" className="p-2 border rounded" />
          <input type="password" placeholder="Password" className="p-2 border rounded" />
          <button className="bg-blue-500 text-white py-2 rounded">Login</button>
        </form>
      </div>
    );
  }
  