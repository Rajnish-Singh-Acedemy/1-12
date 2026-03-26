// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCoflPLOwZ6Ol8FgmCiIMx4Lgn-qSap4Ps",
    authDomain: "rdx-singh-acedemy.firebaseapp.com",
    projectId: "rdx-singh-acedemy",
    storageBucket: "rdx-singh-acedemy.firebasestorage.app",
    messagingSenderId: "833608207106",
    appId: "1:833608207106:web:88c09aee29ed5eff28101b",
    measurementId: "G-EYWXXZBKBP"
};

// Initialize Firebase (Compat Version)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Login & Signup Logic
function handleAuth() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    const msg = document.getElementById('msg'); // Error message dikhane ke liye

    if (!email || !pass) {
        alert("Kripya email aur password bharein");
        return;
    }

    // Pehle Login karne ki koshish karein
    auth.signInWithEmailAndPassword(email, pass)
    .then(() => { 
        window.location.href = "dashboard.html"; 
    })
    .catch((error) => {
        // Agar user nahi mila, toh naya account banayein
        if (error.code === 'auth/user-not-found') {
            auth.createUserWithEmailAndPassword(email, pass)
            .then((userCredential) => {
                db.collection("users").doc(userCredential.user.uid).set({
                    paid: false,
                    email: email,
                    createdAt: new Date()
                }).then(() => {
                    window.location.href = "dashboard.html";
                });
            })
            .catch(err => alert("Signup Error: " + err.message));
        } else {
            alert("Login Error: " + error.message);
        }
    });
}

// Dashboard Logic (Only runs on dashboard.html)
if (window.location.pathname.includes("dashboard.html")) {
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid).get().then(doc => {
                if (doc.exists && doc.data().paid) {
                    document.getElementById('video-box').style.display = 'block';
                    document.getElementById('payment-box').style.display = 'none';
                } else {
                    document.getElementById('payment-box').style.display = 'block';
                    document.getElementById('video-box').style.display = 'none';
                }
            }).catch(err => console.log("Database error:", err));
        } else {
            window.location.href = "login.html";
        }
    });
}

// Logout Function
function logout() {
    auth.signOut().then(() => { 
        window.location.href = "index.html"; 
    });
}

// Placeholder for Payment
function startPayment() {
    alert("Razorpay key setup karne ke baad ye kaam karega. Abhi ke liye database mein 'paid' ko true karke test karein.");
}
