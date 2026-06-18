const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

// Routes
const patientRoutes = require("./routes/patientRoutes");
const reportRoutes = require("./routes/reportRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

// Database Connection
connectDB();

const app = express();
const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// Make Socket.IO available everywhere
app.set("io", io);

// Middleware
app.use(cors());
app.use(express.json());

// ===============================
// API ROUTES
// ===============================

app.use("/api/patients", patientRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/admin", adminRoutes);

// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
    res.send("🏥 QueueCure Backend Running Successfully");
});

// ===============================
// SOCKET CONNECTION
// ===============================

io.on("connection", (socket) => {

    console.log("🟢 Client Connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("🔴 Client Disconnected:", socket.id);
    });

});

// ===============================
// START SERVER
// ===============================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});