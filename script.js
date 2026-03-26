// User Registration Function
function registerUser(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Data base mein entry: User has not paid yet
        db.collection("users").doc(userCredential.user.uid).set({
            paid: false,
            class: "10th" // Example
        });
        alert("Registration Successful!");
    });
}
