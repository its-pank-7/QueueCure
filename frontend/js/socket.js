console.log("🚀 socket.js loaded");

try {

    // Make socket global
    window.socket = io("https://queuecure-zrfx.onrender.com");

    console.log("📡 Trying to connect...");

    socket.on("connect", () => {

        console.log(
            "✅ Connected to Socket Server"
        );

    });

    socket.on("connect_error", (err) => {

        console.error(
            "❌ Socket Error:",
            err
        );

    });

    socket.on("queueUpdated", (data) => {

        console.log(
            "📢 Queue Updated:",
            data
        );

    });

} catch (error) {

    console.error(
        "🔥 JS Error:",
        error
    );

}