/* here I have the prototype */
let cars = [
    {
      name: "Mazda 2",
      model: "2019",
      doors: 5,
      color: "red",
      brand: "mazda"
    }
  ];

/* Here I have the identifiers */
let sname = document.getElementById('name'),
    model = document.getElementById('model'),
    doors = document.getElementById('doors'),
    color = document.getElementById('color'),
    brand = document.getElementById('brand'),
    save = document.getElementById('save'),
    table=document.getElementById('table'),
    header = document.getElementById('header'),
    info=[sname,model,doors];

/* Some useful variables for the edit and delete buttons */
let deleter, index;
let editing=false;

/* Local storage */
let local = window.localStorage;
let data;
check_local();

function check_local(){
    console.log('checking');
    if(local.cars == undefined){
        local.setItem('cars', JSON.stringify(cars));
        console.log(local);

        console.log('example data set');
    }
    data = JSON.parse(local.getItem('cars'));
    rendertable();
}

/* Load the table when the page loads */
document.onload = async function() {
    check_local();
};

/* A function that iterates through the prototype array and adds the information in the table */
function rendertable(){
    console.log('rendering');
    let row;
    for(let i=0; i<data.length; i++){
        row=table.insertRow(i+1);
        let x=0;
        for(let j in data[i]){
            row.insertCell(x).innerHTML = data[i][j];
            x++;
        }
        row.insertCell(5).innerHTML="<button class='edit'>Edit</button><button class='delete'>Delete</button>";
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
    if(sname.value!="" && model.value!="" && doors.value!="" && color.value!="" && brand.value!="" && editing==false){
        data.push({name:sname.value, model: model.value, doors:doors.value, color:color.value, brand: brand.value});
        local.setItem('cars', JSON.stringify(data));
    }else if(sname.value!="" && model.value!="" && doors.value!="" && color.value!="" && brand.value!="" && editing==true){
        data[index].name=sname.value;
        data[index].model=model.value;
        data[index].doors=doors.value;
        data[index].color=color.value;
        data[index].brand=brand.value;
        editing=false;
        local.setItem('cars', JSON.stringify(data));
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
            local.setItem('cars', JSON.stringify(data));
            clear();
            rendertable();
        });
    }

    for(let i=0; i<editor.length; i++){
        editor[i].addEventListener('click', function(){
            sname.value=data[i].name;
            model.value=data[i].model;
            doors.value=data[i].doors;
            color.value=data[i].color;
            brand.value=data[i].brand;
            index=i;
            editing=true;
            clear();
            rendertable();
            editor[i].parentNode.parentNode.setAttribute('class','editing');
        });
    }

}
