export default function AdminDashboard() {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-500 text-white p-4">
          <h1 className="text-2xl">Admin Dashboard</h1>
        </header>
        <main className="p-4">
          <section className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold">Laptop Applications</h2>
            <p className="mt-2">You have 5 new laptop applications to review.</p>
            <button className="mt-4 bg-blue-500 text-white py-2 rounded">Review Applications</button>
          </section>
          <section className="mt-6 bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold">Reports</h2>
            <ul className="mt-2">
              <li><a href="#" className="text-blue-500">View All Applications</a></li>
              <li><a href="#" className="text-blue-500">Generate Usage Reports</a></li>
            </ul>
          </section>
        </main>
      </div>
    );
  }
  