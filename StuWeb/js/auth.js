var uid ;
var project_id ;
var task_id ;

// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
      console.log('in');
    db.collection('project').orderBy('project_name').onSnapshot(snapshot =>{
      let changes = snapshot.docChanges();
      changes.forEach(change => {
         
        
        if(change.type == 'added'){
              createNewProject(change.doc);
          }
          
          else if(change.type == 'removed'){
              let li = projectList.querySelector('[data-id='+ change.doc.id +']');
              
              projectList.removeChild(li);
          }
      });
  });
  } 
  
  else {
    console.log('out');
    console.log('user logged out');
  }
})

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    
    
  });
  signupForm.reset();

});

// logout
const logout = document.querySelector('#signout-button');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();

});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    
    
  });
  loginForm.reset();

})


// fire store data basevar project 



const projectList = document.querySelector('#project-list');
const form = document.querySelector('#add-project-form');

function createNewProject(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let cross = document.createElement('button');
    
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().project_name;
    cross.textContent = "X";
    addBtn(cross);
    li.appendChild(name);
    li.appendChild(cross);
    projectList.appendChild(li);
    //deleting project
    cross.addEventListener('click',function(e){
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('project').doc(id).delete();
    });
}
// add project
form.addEventListener('submit',function(event) {
    
    event.preventDefault();

    db.collection('project').doc(uid).set({
      project_name: form.name.value,
    });
    
    
    form.name.value = '';
});

function addBtn(cross){
    cross.style.float="right";
    cross.setAttribute('class', 'btn btn-outline-dark')
}

// tasks
  

auth.onAuthStateChanged(user => {
  if (user) {
    db.collection('tasks').orderBy('task_name').onSnapshot(snapshot =>{
      let changes = snapshot.docChanges();
      uid = user.uid;
      console.log(uid);
      changes.forEach(change => {


        if(change.type == 'added'){
              createNewTask(change.doc);
          }

          else if(change.type == 'removed'){
              let li = taskList.querySelector('[data-id='+change.doc.id+']');

              taskList.removeChild(li);
          }
      });
  });
  } 

  else {
  }
})

const taskList = document.querySelector('#list-task');
  const taskform = document.querySelector('#add-task-form');


  function createNewTask(doc){
      let li1 = document.createElement('li');
      let name1 = document.createElement('span');
      let cross1 = document.createElement('button');

      li1.setAttribute('data-id', doc.id);
      name1.textContent = doc.data().task_name;
      cross1.textContent = "X";
      
      li1.appendChild(name1);
      li1.appendChild(cross1);
      taskList.appendChild(li1);
      addBtn(cross1);
      //deleting task
      cross1.addEventListener('click',function(e){
        e.preventDefault();
          let id = e.target.parentElement.getAttribute('data-id');
          db.collection('tasks').doc(id).delete();
      });
  }

  // add task
  taskform.addEventListener('submit',function(event) {

      event.preventDefault();

      
      db.collection('tasks').add({
          task_name: taskform.name.value,
      });
      taskform.name.value = '';
  })




