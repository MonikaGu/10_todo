"use strict"

function renderList( list ) {
    const listPlace = document.querySelector('.container');
    let HTML = '';
    
    for (let i = 0; i < list.length; i++) {
        const todoItem = list[i];
     HTML += `
        <div class="item">
            <div class="status ${todoItem.status}"></div>
            <p class="description">${todoItem.description}</p>
            <div class="deadline">${todoItem.deadline}</div>
            <div class="actions">
                <div class="action remove">Remove</div>
            </div>
        </div>`;
    }
    return listPlace.innerHTML += HTML;
}

renderList( todo_list );

// Remove single item

const removeActions = document.querySelectorAll('.item .action.remove');

for ( let i = 0; i < removeActions.length; i++ ) {
    const removeElement = removeActions[i];
    removeElement.addEventListener('click', actionRemoveTodoItem);
}

function actionRemoveTodoItem( event ) {
    const parentItem = event.target.closest('.item');
    parentItem.remove();
}
 
// Remove all items

const BTNremoveAll = document.querySelector('.global-actions > .action.remove');

BTNremoveAll.addEventListener('click', actionRemoveAllTodoItems )

function actionRemoveAllTodoItems( event ) {
    const allTodoItems = event.target
                            .closest('.container')
                            .querySelectorAll('.item');

    for ( let i = 0; i < allTodoItems.length; i++) {
    allTodoItems[i].remove();
    }
}

// Form actions

const DOMform = document.querySelector('.form');
const DOMtaskTextarea = DOMform.querySelector('textarea[name="task"]');
const DOMdeadlineInput = DOMform.querySelector('input[name="deadline"]');
const DOMformActions = DOMform.querySelector('.actions');
const DOMformAdd = DOMformActions.querySelector('.btn.add');
const DOMformClear = DOMformActions.querySelector('.btn.clear');

DOMdeadlineInput.value = formatedDate( 86400000 );     //24*60*60*1000

DOMformClear.addEventListener('click', clearForm );

function clearForm( event ) {
    DOMtaskTextarea.value = '';
    DOMdeadlineInput.value = ''; 
}

DOMformAdd.addEventListener('click', addNewTodoItem);

function addNewTodoItem( event ) {
        let newTodo = {
        description: DOMtaskTextarea.value.trim(),
        created_on: formatedDate(),
        deadline: DOMdeadlineInput.value.trim(),
        status: `todo`
    };
    
    // console.log('TODO: validuojame description');
    if ( newTodo.description.length === 0 ) {
        return console.error('ERROR: tuscias aprasymas');
    }

    // console.log('TODO: validuojame deadline');
    if ( newTodo.deadline.length > 0 && 
        (new Date( newTodo.deadline )).toString() === 'Invalid Date' ) {
        return console.error('ERROR: nevalidus deadline');
    }

    todo_list.push( newTodo );
    renderList( todo_list );
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