// Firebase Configuration (Apni details yahan bharein)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Login & Signup Logic
function handleAuth() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, pass)
    .then(() => { window.location.href = "dashboard.html"; })
    .catch((error) => {
        // Agar account nahi hai to naya bana do
        auth.createUserWithEmailAndPassword(email, pass).then(() => {
            db.collection("users").doc(auth.currentUser.uid).set({
                paid: false,
                email: email
            });
            window.location.href = "dashboard.html";
        });
    });
}

// Payment Check on Dashboard
if(window.location.pathname.includes("dashboard.html")) {
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid).get().then(doc => {
                if (doc.data().paid) {
                    document.getElementById('video-box').style.display = 'block';
                } else {
                    document.getElementById('payment-box').style.display = 'block';
                }
            });
        } else {
            window.location.href = "login.html";
        }
    });
}

// Simple Razorpay Function
function startPayment() {
    alert("Razorpay Integration ke liye API key ki zaroorat hai. Payment success hone par 'paid: true' update karein.");
    // Yahan Razorpay ka payment logic aayega
}

function logout() {
    auth.signOut().then(() => { window.location.href = "index.html"; });
}
