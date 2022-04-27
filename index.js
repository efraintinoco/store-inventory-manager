const form = document.querySelector("form")
const input = document.querySelector("input")
const submit = document.querySelector("submit")
const article = document.querySelector(".inventory")

let items = {}
form.addEventListener("submit", (event) => {
    event.preventDefault()
    const formdata = new FormData(event.target)

    items = {
        itemName: formdata.get("item-name"),
        itemSellIn: formdata.get("sale-in"),
        itemQuality: formdata.get("quality"),
    }

    const listOfInventory = document.createElement("div")
    article.append(listOfInventory)
    listOfInventory.innerHTML = `
    <span>${items.itemName}</span>
    <span>${items.itemSellIn}</span>
    <span>${items.itemQuality}</span>
    
    `

})