import { useEffect } from "react";

function App() {

  const testLogin = async () => {
    const res = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",  // ⭐️ Send/receive cookies
      body: JSON.stringify({ email: "test@example.com", password: "yourpassword" })
    });
    const data = await res.json();
    console.log("Login response:", data);
  };

  const testProtected = async () => {
    const res = await fetch("http://localhost:5001/api/protected", {
      method: "GET",
      credentials: "include"  // ⭐️ Send cookie automatically
    });
    const data = await res.json();
    console.log("Protected response:", data);
  };

  useEffect(() => {
    testLogin();
    setTimeout(testProtected, 2000);  // Wait 2 seconds for cookie to set
  }, []);

  return (
    <div>
      <h1>NyayaSaathi Cookie-based Auth Test</h1>
      <button onClick={testLogin}>Login</button>
      <button onClick={testProtected}>Test Protected Route</button>
    </div>
  );
}

export default App;
