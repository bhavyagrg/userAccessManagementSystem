import { useState } from "react";
import { signup } from "../api/auth";

function Signup() {
  const [form, setForm] = useState({ username: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(form);
    window.location.href = "/login";
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
      <button type="submit">Sign Up</button>
    </form>
  );
}
