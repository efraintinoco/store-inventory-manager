const form = document.querySelector("form")
const table = document.querySelector("table")
const today = new Date().toLocaleDateString("en-US")
const localStorageItems = localStorage.getItem("existingInventory");





let inventory = [{
    item: "+5 Dexterity Vest",
    sellIn: 10,
    quality: 20,
    catagory: "none",
    date: today
}, {
    item: "Aged Brie",
    sellIn: 2,
    quality: 0,
    catagory: "aged Brie",
    date: today
}, {
    item: "Elixir of the Mongoose",
    sellIn: 5,
    quality: 7,
    catagory: "none",
    date: today
}, {
    item: "Sulfuras",
    sellIn: 0,
    quality: 80,
    catagory: "sulfuras",
    date: today
}, {
    item: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 15,
    quality: 20,
    catagory: "backstage pass",
    date: today
}]

inventory.map(item => {

    const tr = document.createElement("tr")

    tr.innerHTML = `
    <td>${item.item}</td>
    <td>${item.sellIn} days</td>
    <td>${item.quality}</td>
    <td>${today}</td>
    `
    table.append(tr)
})

if (localStorageItems) {

    const parsedItems = JSON.parse(localStorageItems)
    const { existingInventory } = parsedItems

    existingInventory.map((items) => {
        const createRow = document.createElement("tr")
        createRow.innerHTML = `
        <td>${items.item}</td>
        <td>${items.sellIn} days</td>
        <td>${items.quality}</td>
        <td>${today}</td>
        `
        table.append(createRow)
    })
}


form.addEventListener("submit", event => {
    event.preventDefault()
    location.reload();
    const formData = new FormData(event.target)
    const itemName = formData.get("item-name")
    const sellIn = formData.get("sell-in")
    const quality = formData.get("quality")
    const date = formData.get("date-added")
    const newInventory = {
        item: itemName,
        sellIn: sellIn,
        quality: quality,
        date: date
    }

    const existingInventory = localStorageItems ? JSON.parse(localStorageItems).existingInventory : []
    existingInventory.push(newInventory)
    const itemsJSON = JSON.stringify({ existingInventory })
    localStorage.setItem("existingInventory", itemsJSON)
})