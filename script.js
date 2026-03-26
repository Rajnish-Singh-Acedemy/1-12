// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoflPLOwZ6Ol8FgmCiIMx4Lgn-qSap4Ps",
  authDomain: "rdx-singh-acedemy.firebaseapp.com",
  projectId: "rdx-singh-acedemy",
  storageBucket: "rdx-singh-acedemy.firebasestorage.app",
  messagingSenderId: "833608207106",
  appId: "1:833608207106:web:88c09aee29ed5eff28101b",
  measurementId: "G-EYWXXZBKBP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
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
