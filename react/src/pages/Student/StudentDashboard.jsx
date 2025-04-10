export default function StudentDashboard() {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-500 text-white p-4">
          <h1 className="text-2xl">Student Dashboard</h1>
        </header>
        <main className="p-4">
          <section className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold">Your Laptop Application Status</h2>
            <p className="mt-2">You have successfully applied for a laptop. Your application is being processed.</p>
          </section>
          <section className="mt-6 bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold">Upcoming Deadlines</h2>
            <ul className="mt-2">
              <li>Submit final assignment: April 15, 2025</li>
              <li>Online exam registration: April 20, 2025</li>
            </ul>
          </section>
        </main>
      </div>
    );
  }
  