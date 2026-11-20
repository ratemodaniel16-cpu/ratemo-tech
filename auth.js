
// ===================================
// RATEMO TECH AUTHENTICATION
// ===================================

const SUPABASE_URL = "https://wpqjdacekmbpurlwqqty.supabase.co";
const SUPABASE_ANON_KEY = "https://wpqjdacekmbpurlwqqty.supabase.co";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

// ===================================
// USER REGISTRATION
// ===================================

const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");

if (signupForm) {

    signupForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;

        signupMessage.textContent = "Creating your account...";

        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    display_name: name
                }
            }
        });

        if (error) {
            signupMessage.textContent = error.message;
            return;
        }

        if (data.session) {
            signupMessage.textContent = "Account created successfully!";
        } else {
            signupMessage.textContent =
                "Account created! Please check your email to confirm your account.";
        }

        signupForm.reset();

    });

}

// ===================================
// USER LOGIN
// ===================================

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        loginMessage.textContent = "Signing you in...";

        try {

            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                loginMessage.textContent = error.message;
                return;
            }

            loginMessage.textContent = "Login successful!";

            window.location.href = "dashboard.html";

        } catch (error) {

            loginMessage.textContent = "Connection error. Please try again.";

        }

    });

}
// ===================================
// DASHBOARD SESSION CHECK
// ===================================
const userName = document.getElementById("userName");
const logoutButton = document.getElementById("logoutButton");

if (userName && logoutButton) {
    async function loadDashboard() {
        const { data, error } = await supabaseClient.auth.getUser();

        if (error || !data.user) {
            window.location.href = "login.html";
            return;
        }

        const name = data.user.user_metadata.display_name || "User";
        userName.textContent = "Welcome, " + name + "!";
    }

    loadDashboard();

    logoutButton.addEventListener("click", async function() {
        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            alert("Logout failed. Please try again.");
            return;
        }

        window.location.href = "login.html";
    });
}
