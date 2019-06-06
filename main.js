// your code here, it may be worth it to ensure this file only runs AFTER the dom has loaded.
const apiUrl = "http://localhost:3000/api/v1/calorie_entries"

document.addEventListener("DOMContentLoaded", ()=>{
  const ulTag = document.querySelector("#calories-list")
  const calForm = document.querySelector("#new-calorie-form")
  const intakeNumber = document.getElementById("intake-number")
  const intakeNote = document.getElementById("intake-note")


  calForm.addEventListener("submit", (event) =>{
    // console.log(intakeNote.value, intakeNumber.value)
    // console.log(event.currentTarget)
    event.preventDefault()
    let newListItem = document.createElement("li")
    newListItem.class="calories-list-item"
    newListItem.innerHTML = `
    <div>
      <div class="uk-grid">
        <div class="uk-width-1-6">
          <strong>${intakeNumber.value}</strong>
          <span>kcal</span>
        </div>
        <div class="uk-width-4-5">
          <em class="uk-text-meta">${intakeNote.value}</em>
        </div>
      </div>
      <div class="list-item-menu">
        <a class="edit-button" uk-toggle="target: #edit-form-container" uk-icon="icon: pencil"></a>
        <a class="delete-button" uk-icon="icon: trash"></a>
      </div>
    </div>`
    ulTag.prepend(newListItem)

  })

  // console.log("loaded")
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      // ulTag.innerHTML += data
      data.forEach( (calEntry) => {
        // console.log(calEntry)
        ulTag.innerHTML += `<li class="calories-list-item">
          <div class="uk-grid">
            <div class="uk-width-1-6">
              <strong>${calEntry.calorie}</strong>
              <span>kcal</span>
            </div>
            <div class="uk-width-4-5">
              <em class="uk-text-meta">${calEntry.note}</em>
            </div>
          </div>
          <div class="list-item-menu">
            <a class="edit-button" uk-icon="icon: pencil" uk-toggle="target: #edit-form-container"></a>
            <a class="delete-button" uk-icon="icon: trash"></a>
          </div>
        </li>`
      })
    })
})
