console.log("🚀 socket.js loaded");

let socket;

try {

    // Global Socket Connection
    socket = io(
        "https://queuecure-zrfx.onrender.com",
        {
            transports: ["websocket", "polling"],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        }
    );

    // Make available everywhere
    window.socket = socket;

    console.log("📡 Trying to connect...");

    socket.on("connect", () => {

        console.log(
            "✅ Connected to Socket Server"
        );

        console.log(
            "🆔 Socket ID:",
            socket.id
        );

    });

    socket.on("disconnect", (reason) => {

        console.warn(
            "⚠️ Socket Disconnected:",
            reason
        );

    });

    socket.on("reconnect", () => {

        console.log(
            "🔄 Reconnected to Socket Server"
        );

    });

    socket.on("connect_error", (err) => {

        console.error(
            "❌ Socket Connection Error:",
            err.message
        );

    });

    socket.on("queueUpdated", (data) => {

        console.log(
            "📢 Queue Updated:",
            data
        );

    });

}
catch (error) {

    console.error(
        "🔥 Socket Initialization Error:",
        error
    );

}