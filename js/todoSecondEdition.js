"use strict";

const DOMcontainer = document.querySelector('.container');
const DOMglobals = DOMcontainer.querySelector('.global-actions');
const BTNremoveAll = DOMglobals.querySelector('.action.remove');
const DOMform = DOMcontainer.querySelector('.form');
const DOMtaskTextarea = DOMform.querySelector('textarea[name="task"]');
const DOMdeadlineInput = DOMform.querySelector('input[name="deadline"]');
const DOMformActions = DOMform.querySelector('.actions');
const DOMformAdd = DOMformActions.querySelector('.btn.add');
const DOMformClear = DOMformActions.querySelector('.btn.clear');

let DOMitems = null;
    
function renderList( list ) {
    for (let i = 0; i < list.length; i++) {
        renderTodoItem( list[i] );
    }
}

function renderTodoItem( data ) {
    const id = 'todo_' + data.id;
    const HTML = `
        <div class="item" id="${id}">
            <div class="status ${data.status}"></div>
            <p class="description">${data.description}</p>
            <div class="deadline">${data.deadline}</div>
            <div class="actions">
                <div class="action remove">Remove</div>
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
    return;
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
    for ( let i = todo_list.length -1; i >= 0; i-- ) {
        removeTodo(i);
    }
}

function removeTodo( todoIndex ) {
    
    DOMitems[todoIndex].remove();
    DOMitems = DOMcontainer.querySelectorAll('.item');

    let leftTodos = [];
    for ( let i = 0; i < todo_list.length; i++ ) {
        if ( i !== todoIndex )
            leftTodos.push( todo_list[i] );
    }
    todo_list = leftTodos;
    return;
}

function createNewTodo () {
    todo_id++;
    let newTodo = {
        id: todo_id,
        description: DOMtaskTextarea.value.trim(),
        created_on: formatedDate(),
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
        return console.error('ERROR: nevalidus deadline');
    }

    todo_list.push( newTodo );
    renderTodoItem( newTodo );
}

renderList(todo_list);

DOMdeadlineInput.value = formatedDate( 86400000 );

BTNremoveAll.addEventListener('click', removeAllTodos);

DOMformAdd.addEventListener('click', createNewTodo);