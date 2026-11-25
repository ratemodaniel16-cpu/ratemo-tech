// RATEMO TECH - ADMIN DASHBOARD

const supabaseClient = window.supabase.createClient(
    "https://wpqjdacekmbpurlwqqty.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwcWpkYWNla21icHVybHdxcXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUxNTEyMTUsImV4cCI6MjExMDcyNzIxNX0.ibTW51ExVmZjAke6KsbGgRPqcRpCFMZrnUFYXkBVoLo"
);

async function loadDashboard() {
    const { data: { user }, error } =
        await supabaseClient.auth.getUser();

    if (error || !user) {
        window.location.href = "login.html";
        return;
    }

    const { data: profile, error: profileError } =
        await supabaseClient
            .from("profiles")
            .select("display_name, role")
            .eq("id", user.id)
            .single();

    if (profileError || profile.role !== "admin") {
        alert("Access denied. Admins only.");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("userName").textContent =
        `Welcome, ${profile.display_name || "Admin"}!`;

    document.getElementById("adminPanel").style.display = "block";

    loadMessages();
}

async function loadMessages() {
    const { data, error } = await supabaseClient
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

    const messagesList = document.getElementById("messagesList");

    if (error) {
        messagesList.textContent = "Could not load messages.";
        console.error(error);
        return;
    }

    if (!data.length) {
        messagesList.textContent = "No messages yet.";
        return;
    }

    messagesList.replaceChildren();

    data.forEach(message => {
        const card = document.createElement("article");
        const heading = document.createElement("h3");
        const email = document.createElement("p");
        const subject = document.createElement("p");
        const content = document.createElement("p");
        const date = document.createElement("small");

        heading.textContent = message.name;
        email.textContent = message.email;
        subject.textContent = message.subject;
        content.textContent = message.message;
        date.textContent = new Date(message.created_at).toLocaleString();

        card.append(heading, email, subject, content, date);
        messagesList.appendChild(card);
    });
}

document.getElementById("logoutButton").addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
    window.location.href = "login.html";
});

loadDashboard();