import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    // TODO: potential DB connection check here if manual connection needed
    // Prisma connects lazily usually, or we can explicit connect.

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();
