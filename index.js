const form = document.querySelector("form")
const table = document.querySelector("table")
const today = new Date().toLocaleDateString("en-US")
const localStorageItems = localStorage.getItem("allInventory");
const itemName = document.querySelector("#item-name");
const itemQualityInput = document.querySelector("#quality");
const updateEndOfDay = document.querySelector("#update")
const clear = document.querySelector("#clear")



let inventory = [{
    item: "+5 Dexterity Vest",
    sellIn: 10,
    quality: 20,
    category: "None",
    date: today
}, {
    item: "Aged Brie",
    sellIn: 2,
    quality: 0,
    category: "Aged Brie",
    date: today
}, {
    item: "Elixir of the Mongoose",
    sellIn: 5,
    quality: 7,
    category: "none",
    date: today
}, {
    item: "Sulfuras",
    sellIn: 0,
    quality: 80,
    category: "Sulfuras",
    date: today
}, {
    item: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 15,
    quality: 20,
    category: "Backstage Pass",
    date: today
}]
/*
inventory.map(item => {

    const tr = document.createElement("tr")

    tr.innerHTML = `
    <td>${item.item}</td>
    <td>${item.sellIn} days</td>
    <td>${item.quality}</td>
    <td>${today}</td>
    <td>${item.category}</td>
    `
    table.append(tr)
})
*/
if (localStorageItems) {

    const parsedItems = JSON.parse(localStorageItems)
    const { allInventory } = parsedItems

    allInventory.map((items) => {
        const createRow = document.createElement("tr")
        createRow.innerHTML = `
        <td>${items.item}</td>
        <td>${items.sellIn} days</td>
        <td>${items.quality}</td>
        <td>${today}</td>
        <td>${items.category}</td>
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
    const category = parseCategory(itemName)
    console.log(parseCategory(itemName))
    const newInventory = {
        item: itemName,
        sellIn: sellIn,
        quality: quality,
        date: date,
        category: category,
    }

    const allInventory = localStorageItems ? JSON.parse(localStorageItems).allInventory : []
    allInventory.push(newInventory)
    const itemsJSON = JSON.stringify({ allInventory })
    localStorage.setItem("allInventory", itemsJSON)
})

itemName.addEventListener("input", () => {
    if (itemName.value.toLowerCase().includes("sulfuras")) {
        itemQualityInput.value = 80;
        itemQualityInput.max = 80;
        itemQualityInput.min = 80;
    } else {
        itemQualityInput.max = 50;
        itemQualityInput.min = 0;
    }
})

function parseCategory(itemName) {

    let category = ""
    inventory.forEach(item => {
        if (item.item.includes(itemName)) {
        category = item.category
        }
    })
    return category
}

//allitemsinventory change to go thru , and apply changes to those items 
function degradeQuality(item) {
    if (item.item === "Sulfuras") {
        return item.quality = 80
    } else if (item.item === "Conjured") {
        return item.quality -= 2
    } else if (item.item === "Backstage passes" && item.sellIn > 10) {
        return item.quality += 1
    } else if (item.item === "Backstage passes" && item.sellIn <= 10) {
        return item.quality += 2
    } else if (item.item === "Backstage passes" && item.sellIn <= 5) {
        return item.quality += 3
    } else if (item.item === "Backstage passes" && item.sellIn <= 0) {
        return item.quality = 0
    } else if (item.sellIn <= 0) {
        return item.quality -= 2
    } else if (item.item === "Aged Brie") {
        return item.quality += 1
    } else {
        return item.quality -= 1
    }

}
degradeQuality()
console.log(degradeQuality())



/*
function updateSellIn(item) {
    if (item.item === "Sulfuras") {
        return item.sellIn = 0
    } else if (item.sellIn > 0) {
        return item.sellIn = item.sellIn - 1
    }
 
}
*/
/*
function checkQuality(item) {
    if (item.name === "Sulfuras") {
        return item.quality = 80
    } else if (item.quality > 50) {
        return item.quality = 50
    } else if (item.quality < 0) {
        return item.quality = 0
    } else {
        return item.quality
    }
 
}
*/

updateEndOfDay.addEventListener("click", event => {
    degradeQuality(item)
   
    const itemsJSON = JSON.stringify({ allInventory })
   
    localStorage.setItem("allInventory", itemsJSON)
    const allInventory = localStorageItems ? JSON.parse(localStorageItems).allInventory : []
    location.reload();
    

//
})


clear.addEventListener("click", (event) => {
    localStorage.clear()
    window.location.reload()
})
