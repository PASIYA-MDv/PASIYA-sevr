<!-- add <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
     <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
     <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
     <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-storage-compat.js"></script>
-->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-storage-compat.js"></script>
<script>
  // ---- REPLACE these with your Firebase project's config ----
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-app",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
</script>
