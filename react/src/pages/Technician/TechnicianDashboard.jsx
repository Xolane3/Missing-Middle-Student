export default function TechnicianDashboard() {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-500 text-white p-4">
          <h1 className="text-2xl">Technician Dashboard</h1>
        </header>
        <main className="p-4">
          <section className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold">Available Laptop Devices</h2>
            <p className="mt-2">You have 15 available laptops for distribution.</p>
            <button className="mt-4 bg-blue-500 text-white py-2 rounded">Update Available Devices</button>
          </section>
          <section className="mt-6 bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold">Device Maintenance</h2>
            <ul className="mt-2">
              <li><a href="#" className="text-blue-500">View Device History</a></li>
              <li><a href="#" className="text-blue-500">Track Repairs</a></li>
            </ul>
          </section>
        </main>
      </div>
    );
  }
  