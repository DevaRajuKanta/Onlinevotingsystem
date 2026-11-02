 import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");

    // Check fields
    if (!name || !email || !password) {
      setMessage("Please fill all fields");
      return;
    }

    // Check password
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");

        // Clear form
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setMessage(data.message || "Registration failed");
      }

    } catch (error) {
      console.log("Frontend error:", error);
      setMessage("Server connection failed");
    }
  };


  return (
    <div className="register-container">

      <h1>Online Voting System</h1>

      <h2>Voter Registration</h2>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password (minimum 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="8"
          required
        />

        <button type="submit">
          Register
        </button>

      </form>

      <p>{message}</p>

    </div>
  );
}

export default Register;