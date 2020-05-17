"use strict";
let todo_id = 0;
let todo_list = [];

const DOMcontainer = document.querySelector('.container');

const DOMglobals = DOMcontainer.querySelector('.global-actions');
const BTNremoveAll = DOMglobals.querySelector('.action.remove');

const DOMform = DOMcontainer.querySelector('.form');
const DOMtaskTextarea = DOMform.querySelector('textarea[name="task"]');
const DOMswitchStatus = DOMform.querySelector('.switch');
const DOMdeadlineInput = DOMform.querySelector('input[name="deadline"]');
const DOMformActions = DOMform.querySelector('.actions');
const DOMformAdd = DOMformActions.querySelector('.btn.add');
const DOMformClear = DOMformActions.querySelector('.btn.clear');
const DOMformSave = DOMformActions.querySelector('.btn.save');
const DOMformCancel = DOMformActions.querySelector('.btn.cancel');

let DOMitems = null;
    
function renderList( list ) {
    for (let i = 0; i < list.length; i++) {
        renderTodoItem( list[i] );
    }
}

function renderTodoItem( data ) {
    const id = 'todo_'+data.id;
    const HTML = `
        <div class="item" id="${id}" data-task-id="${data.id}">
            <div class="status ${data.status}"></div>
            <p class="description">${data.description}</p>
            <div class="deadline">${data.deadline}</div>
            <div class="actions">
                <div class="action remove">Remove</div>
                <div class="action edit">Edit</div>
            </div>
        </div>`;

    DOMcontainer.insertAdjacentHTML( 'beforeend', HTML );
    DOMitems = DOMcontainer.querySelectorAll('.item');

    const item = DOMcontainer.querySelector('#'+id);
   

    item.querySelector('.action.remove')
        .addEventListener('click', () => {
            let currentlyAddedItemIndex = 0;


            for ( let i = 0; i < DOMitems.length; i++ ) {
                if ( DOMitems[i].id === id ) {
                    currentlyAddedItemIndex = i;
                    break;
                }
            }
            removeTodo( currentlyAddedItemIndex );
        });

    item.querySelector('.action.edit')
        .addEventListener('click', () => {
            DOMcontainer.classList.add('editing');
            DOMform.classList.add('editing');
            populateEditingForm( data. id );
        });
    return;
}

function populateEditingForm( id ) {
    let task = {};
    let i = 0;
    for ( ; i < todo_list.length; i++) {
        if ( todo_list[i].id === id ) {
            task = todo_list[i];
            break;
        }
    }

    DOMform.setAttribute('data-task-index', i);
    DOMtaskTextarea.value = task.description;
    DOMdeadlineInput.value = task.deadline;
    DOMswitchStatus.setAttribute('data-selected', task.status);
}

function formatedDate( deltaTime = 0 ) {
    let now = new Date();

    if ( deltaTime !== 0 ) {
        now = new Date ( Date.now() + deltaTime )
    }
    
    let min = now.getMinutes();
    let hours = now.getHours();
    let month = now.getMonth() + 1;
    let days = now.getDate();
    const year = now.getFullYear();

    if ( min < 10 ) {
        min = '0' + min;
    }
    if ( hours < 10 ) {
        hours = '0' + hours;
    }
    if ( days < 10 ) {
        days =  '0' + days;
    }
    if ( month < 10 ) {
        month = '0' + month;
    }

    return year + '-'+ month + '-'+ days + ' ' + hours + ':' + min;
}

function removeAllTodos() {
    for ( let i = DOMitems.length-1; i >= 0; i-- ) {
        removeTodo(i);
    }
}

function removeTodo( todoIndex ) {
    
    DOMitems[todoIndex].remove();
    DOMitems = DOMcontainer.querySelectorAll('.item');

    let leftTodos = [];
    for ( let i = 0; i < todo_list.length; i++ ) {
        if ( i !== todoIndex ) {
            leftTodos.push( todo_list[i] );
        }
    }

    todo_list = leftTodos;
    updateMemory();
    return;
}

function createNewTodo() {
    let newTodo = {
        id: todo_id,
        created_on: formatedDate(),
        description: DOMtaskTextarea.value.trim(),
        deadline: DOMdeadlineInput.value.trim(),
        status: `todo`
    };
    console.log(newTodo);
    
    
    // console.log('TODO: validuojame description');
    if ( newTodo.description.length === 0 ) {
        return alert('ERROR: tuscias aprasymas');
    }

    // console.log('TODO: validuojame deadline');
    if ( newTodo.deadline.length > 0 && 
        (new Date( newTodo.deadline )).toString() === 'Invalid Date' ) {
        return alert('ERROR: nevalidus deadline');
    }

    todo_list.push( newTodo );
    renderTodoItem( newTodo );
    todo_id++;
    updateMemory();
}

function updateTaskInfo() {
    const index = parseInt(DOMform.dataset.taskIndex);
    const description = DOMtaskTextarea.value;
    const deadline = DOMdeadlineInput.value;
    const status = DOMswitchStatus.dataset.selected;

    if ( description.length === 0 ) {
        return alert('ERROR: tuscias aprasymas');
    }

    if ( deadline.length > 0 && 
        (new Date( deadline )).toString() === 'Invalid Date' ) {
        return alert('ERROR: nevalidus deadline');
    }

    todo_list[index].description = description;
    todo_list[index].deadline = deadline;
    todo_list[index].status = status;

    updateMemory(); 

    const task_id = '#todo_'+todo_list[index].id;
    const DOMtask = DOMcontainer.querySelector(task_id);
    DOMtask.querySelector('.description').innerText = description;
    DOMtask.querySelector('.deadline').innerText = deadline;
    const DOMstatus = DOMtask.querySelector('.status');
    DOMstatus.classList.remove('todo', 'progress', 'done');
    DOMstatus.classList.add(status);
    
}

function clearForm() {
    DOMtaskTextarea.value = '';
    DOMswitchStatus.setAttribute('data-selected', 'todo');
    DOMdeadlineInput.value = formatedDate( 86400000 );
    DOMform.classList.remove('editing');
    DOMcontainer.classList.remove('editing');
}

function updateSwitch( event ) {
    const value = event.target.dataset.option;
    event.target.parentElement.setAttribute('data-selected', value);
}

function memoryManagement() {
    // todo_id = 0;
    if ( localStorage.getItem('todo_id') ) {
        todo_id = JSON.parse( localStorage.getItem('todo_id') );
    } else {
        localStorage.setItem('todo_id', JSON.stringify(todo_id) );
    }
    
    // todo_listt = [];
    if ( localStorage.getItem('todo_list') ) {
        todo_list = JSON.parse( localStorage.getItem('todo_list') );
    } else {
        localStorage.setItem('todo_list', JSON.stringify(todo_list) );
    }
}

function updateMemory() {
    localStorage.setItem('todo_id', JSON.stringify(todo_id) );
    localStorage.setItem('todo_list', JSON.stringify(todo_list) );
}
memoryManagement();

renderList(todo_list);

DOMdeadlineInput.value = formatedDate( 86400000 );

BTNremoveAll.addEventListener('click', removeAllTodos);

DOMformAdd.addEventListener('click', () => {
    createNewTodo();
    clearForm();
});

DOMformClear.addEventListener('click', clearForm);

DOMswitchStatus.addEventListener('click', updateSwitch)

DOMformSave.addEventListener('click', () => {
    updateTaskInfo();
    clearForm();
});

DOMformCancel.addEventListener('click', () => {
    clearForm();
} );