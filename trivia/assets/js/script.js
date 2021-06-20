let qnumbers = document.querySelector('#amount'),
    shownumbers = document.querySelector('.show_number'),
    type = document.querySelector('#type'),
    category = document.querySelector('#category'),
    start = document.querySelector('#start'),
    difficulty = document.querySelector('#difficulty'),
    question = document.querySelector('#question'),
    q_num = document.querySelector('#q_num'),
    ans_container = document.querySelector('#ans_container'),
    qa = document.querySelector('#qa'),
    span_score = document.querySelector('span'),
    leaderboard = document.querySelector('#leaderboard'),
    main = document.querySelector('#main'),
    restart = document.querySelector('#restart'),
    local = localStorage,
    scoreboard = [],
    submit = document.querySelector('#submit'),
    namer = document.querySelector('#name'),
    name_form = document.querySelector('#name_form'),
    table = document.querySelector('table');

console.log(table);

qnumbers.addEventListener('input', function(){
    shownumbers.innerHTML= qnumbers.value;
    shownumbers.style.left= `${((qnumbers.value-4.9)*9.1)}%`;
});

start.addEventListener('click', async function(){
    let index=0,
        points=0,
        data= await fetchapi();
    await main.classList.add('hidden');
    await console.log(data);
    await render(data, index, points);
    await qa.classList.remove('hidden');
    name_form.classList.remove('hidden');
    init_table();
    render_table();
});

restart.addEventListener('click', function (){
    leaderboard.classList.add('hidden');
    main.classList.remove('hidden');
});

submit.addEventListener('click', function(){
    scoreboard.push({name:namer.value, points: span_score.innerHTML});
    local.setItem('score', JSON.stringify(scoreboard));
    name_form.classList.add('hidden');
    render_table();
});

let amount, diff, qtype, categ;

function catchurl(){
    amount = `amount=${qnumbers.value}`;

    diff = () => {
        if(difficulty.value == 'default'){
            return '';
        }else{
            return `&difficulty=${difficulty.value}`;
        }
    };

    qtype = () => {
        if(type.value == 'default'){
            return '';
        }else{
            return `&type=${type.value}`;
        }
    };

    categ = () => {
        if(category.value == 'default'){
            return '';
        }else{
            return `&category=${category.value}`;
        }
    };
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function render(data, index, points) {
    // this will clear the container
    ans_container.innerHTML='';

    //hre we define the variables in order to add the buttons
    question.innerHTML= data.results[index].question;
    let answers =  data.results[index].incorrect_answers,
        rand = getRandomInt(answers.length);
        len= data.results.length;
        console.log(len);
    answers.splice(rand, 0, data.results[index].correct_answer);
    console.log(answers);
    
    // cicle to create elements
    for(let i=0; i<answers.length; i++){
        let x=document.createElement('button');
        x.setAttribute('class', 'spacing pulsing2 op');
        ans_container.appendChild(x).innerHTML=answers[i];
        q_num.innerHTML = `Question ${index+1}`;

        //listener on click for answers
        x.addEventListener('click', function(){
            //cumulative points
            if (x.innerHTML == data.results[index].correct_answer){
                points++;
            }
            
            //change questions nd options
            if (index<len-1){
                index++;
                console.log(index);
                render(data, index, points);
            }else{
                span_score.innerHTML = points;
                qa.classList.add('hidden');
                leaderboard.classList.remove('hidden');
            }
        });
    }
}

function init_table(){
    if (local.score!==undefined){
        scoreboard = JSON.parse(local.score);
    }
    console.log(local.score);
}

function render_table(){
    table.innerHTML = '<tr><th>Name</th><th>Points</th></tr>';
    let row;
    for(let i = 0; i < scoreboard.length; i++){
        row = table.insertRow(i+1);
        let x = 0;
        for(let j in scoreboard[i]){
            row.insertCell(x).innerHTML = scoreboard[i][j];
            x++;
        }
    }
}

const fetchapi = async () => {
    catchurl();
    console.log(`https://opentdb.com/api.php?${amount}${categ()}${diff()}${qtype()}`);
    const response = await fetch(`https://opentdb.com/api.php?${amount}${categ()}${diff()}${qtype()}`);
    const data = await response.json();
    return await data;
}