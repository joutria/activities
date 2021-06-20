/* here I have the prototype */
let user = [{
        name: 'Example',
        lastName: 'User',
        email: 'eu@example.com'
    },
    {
        name: 'User',
        lastName: 'Example',
        email: 'ue@example.com'
    }
];

/* Here I have the identifiers */
let sname = document.getElementById('name'),
    lastname = document.getElementById('lastname'),
    email = document.getElementById('email'),
    save = document.getElementById('save'),
    table=document.getElementById('table'),
    header = document.getElementById('header'),
    info=[sname,lastname,email];

/* Some useful variables for the edit and delete buttons */
let deleter, index;
let editing=false;

/* Local storage */
let local = window.localStorage;

function check_local(){
    if(local.data == undefined){
        console.log(local);
        local.setItem('user', JSON.stringify(user));
        console.log('example data set');
    }
}

data = JSON.parse(local.getItem('user'));

/* Load the table when the page loads */
window.onload = function() {
    check_local();
    rendertable();
};

/* A function that iterates through the prototype array and adds the information in the table */
function rendertable(){
    let row;
    for(let i=0; i<data.length; i++){
        row=table.insertRow(i+1);
        let x=0;
        for(let j in data[i]){
            row.insertCell(x).innerHTML = data[i][j];
            x++;
        }
        row.insertCell(3).innerHTML="<button class='edit'>Edit</button><button class='delete'>Delete</button>";
    }
    loadbtn();
}

/* Whit this one I clear the information befor reloading it with rendertable (just to avoid stacking) */
function clear(){
    table.innerHTML='';
    table.appendChild(header);
}

/* Adding functionality to the save button */
save.addEventListener('click', function(){
    if(sname.value!="" && lastname.value!="" && email.value!="" && editing==false){
        data.push({name:sname.value, lastName: lastname.value, email:email.value});
        local.setItem('user', JSON.stringify(data));
    }else if(sname.value!="" && lastname.value!="" && email.value!="" && editing==true){
        data[index].name=sname.value;
        data[index].lastName=lastname.value;
        data[index].email=email.value;
        editing=false;
        local.setItem('user', JSON.stringify(data));
    }else{
        alert('All the fields must be populated');
    }
    clear();
    rendertable();
});

/* Adding functionality to the edit and delete buttons */
function loadbtn(){
    deleter=document.querySelectorAll('.delete');
    editor=document.querySelectorAll('.edit');

    for(let i=0; i<deleter.length; i++){
        deleter[i].addEventListener('click', function(){
            data.splice(i,1);
            local.setItem('user', JSON.stringify(data));
            clear();
            rendertable();
        });
    }

    for(let i=0; i<editor.length; i++){
        editor[i].addEventListener('click', function(){
            sname.value=data[i].name;
            lastname.value=data[i].lastName;
            email.value=data[i].email;
            index=i;
            editing=true;
            clear();
            rendertable();
            editor[i].parentNode.parentNode.setAttribute('class','editing');
        });
    }

}
