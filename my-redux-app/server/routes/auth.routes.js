import express from "express";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Email and password are required",
    });
  }

  // In a real app you'd store this in Supabase or a DB
  console.log("New user registered:", email);

  res.json({
    success: true,
    user: { email },
  });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Missing credentials",
    });
  }

  res.json({
    success: true,
    user: { email },
    token: "fake-jwt-token",
  });
});

export default router;