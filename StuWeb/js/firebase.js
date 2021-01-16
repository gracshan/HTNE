const projectList = document.querySelector('#project-list');
const form = document.querySelector('#add-project-form');

function createNewProject(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let cross = document.createElement('button');
    
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().project_name;
    cross.textContent = "x";

    li.appendChild(name);
    li.appendChild(cross);
    projectList.appendChild(li);
    addBtn(cross);
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
    db.collection('project').add({
        project_name: form.name.value,
    });
    form.name.value = '';

}); 

db.collection('project').orderBy('project_name').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            createNewProject(change.doc);
        }else if(change.type == 'removed'){
            let li = projectList.querySelector('[data-id='+ change.doc.id +']');
            projectList.removeChild(li);
        }
    });
});

function addBtn(button){
    button.setAttribute('class','btn btn-outline-light width1');
}

// add lofi hip-hop music streaming
function play(){
    document.getElementById('lofi').display:true;
}

//remove lofi hip-hop streaming
function stop(){
    document.getElementById('lofi').style.display="none";
}
