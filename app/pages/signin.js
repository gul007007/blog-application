import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SigninPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    if (result.error) {
      alert(result.error);
    } else {
      alert("Sign-in successful!");
      window.location.href = "/protected"; // Redirect to a protected page
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button type="submit">Sign In</button>
    </form>
  );
}
