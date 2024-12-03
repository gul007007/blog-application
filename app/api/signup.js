import bcryptjs from "bcryptjs";

// Dummy user database (replace with a real database in production)
const users = [];

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    // Check if the user already exists
    if (users.find((u) => u.email === email)) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password and save the user
    const hashedPassword = bcryptjs.hashSync(password, 10);
    users.push({ id: Date.now(), name, email, password: hashedPassword });
    return res.status(201).json({ message: "User registered successfully" });
  }
  res.status(405).json({ message: "Method not allowed" });
}
