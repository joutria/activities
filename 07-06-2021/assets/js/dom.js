let body=document.querySelector("#container>.body"),
    search=document.querySelector("#search"),
    clear=document.querySelector("#clear"),
    input=document.querySelector("#input"),
    sname=document.querySelector("#name"),
    age=document.querySelector("#age"),
    email=document.querySelector("#email"),
    social=document.querySelector("#social"),
    gender=document.querySelector("#gender"),
    show=document.querySelector("#show"),
    selector=document.querySelector("#select");

function clear_all() {
    sname.innerHTML='<p class="title">NAME</p>';
    age.innerHTML='<p class="title">AGE</p>';
    email.innerHTML='<p class="title">E-MAIL</p>';
    social.innerHTML='<p class="title">SOCIAL</p>';
    gender.innerHTML='<p class="title">GENDER</p>';
}

show.addEventListener("click", function(){
    only("", users, true);
});

clear.addEventListener("click", function(){
    clear_all();
});

search.addEventListener("click", function(){
    only(input.value, users, undefined);
});

function only(ending, list, all){
    let length = list.length,
        sel=selector.value;
    clear_all();
    console.log(list[i][sel]);
    for(let i = 0 ; i < length; i++){
        if (list[i][sel].endsWith(ending)==true || all!=undefined){
            let added=document.createElement("p");
            added.innerText=list[i].email;
            email.appendChild(added);
        }
    }

    for(let i = 0 ; i < length; i++){
        if (list[i][sel].endsWith(ending)==true || all!=undefined){
            let added=document.createElement("p");
            added.innerText=list[i].age;
            age.appendChild(added);
        }
    }

    for(let i = 0 ; i < length; i++){
        if (list[i][sel].endsWith(ending)==true || all!=undefined){
            let added=document.createElement("p");
            added.innerText=list[i].name;
            sname.appendChild(added);
        }
    }

    for(let i = 0 ; i < length; i++){
        if (list[i][sel].endsWith(ending)==true || all!=undefined){
            let added=document.createElement("p");
            added.innerText=list[i].gender;
            gender.appendChild(added);
        }
    }

    for(let i = 0 ; i < length; i++){
        if (list[i][sel].endsWith(ending)==true || all!=undefined){
            let added=document.createElement("p");
            added.innerText=list[i].social[0].url;
            social.appendChild(added);
        }
    }
    console.log(ending);
}