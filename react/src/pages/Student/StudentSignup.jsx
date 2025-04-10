export default function StudentSignup() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Student Signup</h1>
        <form className="flex flex-col gap-2 w-1/3">
          <input type="text" placeholder="Full Name" className="p-2 border rounded" />
          <input type="email" placeholder="Email Address" className="p-2 border rounded" />
          <input type="password" placeholder="Password" className="p-2 border rounded" />
          <input type="password" placeholder="Confirm Password" className="p-2 border rounded" />
          <button className="bg-blue-500 text-white py-2 rounded">Signup</button>
        </form>
        <p className="mt-4 text-sm">
          Already have an account? <a href="/student/login" className="text-blue-500">Login</a>
        </p>
      </div>
    );
  }
  