import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

//the database you created in firebase
const appSettings = {
    databaseURL: "https://goals-app-6f03a-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const goalListInDB = ref(database, "goalList")


const inputFieldEl = document.getElementById('input-field')
const addButtonEl = document.getElementById('add-button')
const goalListEl = document.getElementById('goal-list')


addButtonEl.addEventListener('click', () => {
    let inputValue = inputFieldEl.value

    push(goalListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(goalListInDB, function(snapshot) {
//checks database for a snapshot
    if(snapshot.exists()) {
        //if there is one get the value of the snapshot
        let itemsArray = Object.entries(snapshot.val())

        clearGoalListEl()    
    
        for(let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemId = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemToGoalListEl(currentItem)
        }
    } else {
        goalListEl.innerHTML = "No items here...yet"
    }
   
    
  
})

function clearGoalListEl() {
    goalListEl.innerHTML = ''
}

function clearInputFieldEl() {
    inputFieldEl.value = ''
}

function appendItemToGoalListEl(item) {
    
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement('li')
    newEl.textContent = itemValue

    newEl.addEventListener('click', function(){
        
        let exactLocationOfItemInDB = ref(database, `goalList/${itemID}`)

        remove(exactLocationOfItemInDB)
    })

    goalListEl.append(newEl)
}