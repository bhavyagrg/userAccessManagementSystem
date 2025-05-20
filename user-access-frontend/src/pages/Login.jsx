import { useState } from "react";
import { login } from "../api/auth";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token, role } = await login(form);
    localStorage.setItem("user", JSON.stringify({ token, role }));
    if (role === "Admin") window.location.href = "/create-software";
    else if (role === "Manager") window.location.href = "/pending-requests";
    else window.location.href = "/request-access";
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
}
