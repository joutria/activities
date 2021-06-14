/* here I have the prototype*/
let user = [{
    name: 'Jose',
    lastName: 'Utria',
    email: 'joutria@academlo.com'
    },
    {
        name: 'Luis',
        lastName: 'Utria',
        email: 'lutria@academlo.com'
    }
];

/* Here I have the identifiers*/
let sname = document.getElementById('name'),
    lastname = document.getElementById('lastname'),
    email = document.getElementById('email'),
    save = document.getElementById('save'),
    table=document.getElementById('table'),
    header = document.getElementById('header'),
    info=[sname,lastname,email];

/* Some useful variables for the edit and delete buttons*/
let deleter, index;
let editing=false;

/* Load the table when the page loads */
window.onload = function() {
    rendertable();
};

/* A function that iterates through the prototype array and adds the information in the table*/
function rendertable(){
    let row;
    for(let i=0; i<user.length; i++){
        row=table.insertRow(i+1);
        let x=0;
        for(let j in user[i]){
            row.insertCell(x).innerHTML = user[i][j];
            x++;
        }
        row.insertCell(3).innerHTML="<button class='edit'>Edit</button><button class='delete'>Delete</button>";
    }
    loadbtn();
}

/* Whit this one I clear the information befor reloading it with rendertable (just to avoid stacking)*/
function clear(){
    table.innerHTML='';
    table.appendChild(header);
}

/* Adding functionality to the save button*/
save.addEventListener('click', function(){
    if(sname.value!="" && lastname.value!="" && email.value!="" && editing==false){
        user.push({name:sname.value, lastname: lastname.value, email:email.value});
    }else if(sname.value!="" && lastname.value!="" && email.value!="" && editing==true){
        user[index].name=sname.value;
        user[index].lastName=lastname.value;
        user[index].email=email.value;
        editing=false;
    }else{
        alert('All the fields must be populated');
    }
    clear();
    rendertable();
});

/* Adding functionality to the edit and delete buttons*/
function loadbtn(){
    deleter=document.querySelectorAll('.delete');
    editor=document.querySelectorAll('.edit');

    for(let i=0; i<deleter.length; i++){
        deleter[i].addEventListener('click', function(){
            user.splice(i,1);
            clear();
            rendertable();
        });
    }

    for(let i=0; i<editor.length; i++){
        editor[i].addEventListener('click', function(){
            sname.value=user[i].name;
            lastname.value=user[i].lastName;
            email.value=user[i].email;
            index=i;
            editing=true;
            clear();
            rendertable();
        });
    }

}
