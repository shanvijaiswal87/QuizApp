


  
  const firebaseConfig = {
    apiKey: "AIzaSyDl6a2aEMj4h-f7dmBWyK0uT7uYmccejtc",
    authDomain: "quiz-a51da.firebaseapp.com",
    projectId: "quiz-a51da",
    storageBucket: "quiz-a51da.appspot.com",
    messagingSenderId: "892803150266",
    appId: "1:892803150266:web:c602ac467347c3f8f72d83"
  };

 
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.database()


function register () {
 
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  confirmPassword=document.getElementById('confirmPassword').value
  full_name = document.getElementById('full_name').value
  

 
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Please enter a valid Email or Password')
    return
    
  }
  if (validate_field(full_name) == false ) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }

  if (password.length < 6) {
    alert("Password must be at least 8 characters long.");
    return false;
  } 

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }
 
 
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    
    var user = auth.currentUser

   
    var database_ref = database.ref()

   
    var user_data = {
      email : email,
      full_name : full_name,
      last_login : Date.now()
    }

    
    database_ref.child('users/' + user.uid).set(user_data)

    
   
    console.log('Account Created!!')

    window.location.href = "index.html";
  })
  .catch(function(error) {
    
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })

  
}








function login() {
  
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Please enter a valid Email or Password')
    return
    
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    
    var user = auth.currentUser

   
    var database_ref = database.ref()

   
    var user_data = {
      last_login : Date.now()
    }

   
    database_ref.child('users/' + user.uid).update(user_data)

    
    console.log('Logged In!!')
    window.location.href = "index.html";

  })
  .catch(function(error) {
   
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}





function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
   
    return true
  } else {
   
    return false
  }
}

function validate_password(password) {
  
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}