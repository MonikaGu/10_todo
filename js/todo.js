"use strict"

let todo_list = [
    {
        description: `Sportuoti`,
        created_on: `2020-05-05 15:01`,
        deadline: `2020-05-06 17:35`,
        status: `todo`
    },
    {
        description: `Pavalgyti`,
        created_on: `2020-05-05 17:36`,
        deadline: `2020-05-05 18:00`,
        status: `todo`
    },
    {
        description: `Eiti pasivaikscioti`,
        created_on: `2020-05-05 18:15`,
        deadline: `2020-05-06 20:00`,
        status: `todo`
    }
];

console.log(todo_list);

for (let i = 0; i < todo_list.length; i++) {
    const todo = todo_list[i];
    const sentence = `Uzduotis, kuria reikia padaryti yra "${todo.description}" ir ja reikia atlikti iki ${todo.deadline}, siuo metu yra busenoje "${todo.status}".`;
    console.log(sentence);
}