const main = document.querySelector("main")
const form = document.querySelector("form")
const button = document.querySelector("button")
const today = new Date().toLocaleDateString("en-US")


let inventory = [{
    name: "+5 Dexerity Vest",
    sell_in: 10,
    quality: 20,
    category: "none",
    date: today
}, {
    name: "Aged Brie",
    sell_in: 2,
    quality: 0,
    category: "Aged Brie",
    date: today
}, {
    name: "Elixir of the Mongoose",
    sell_in: 5,
    quality: 7,
    category: "none",
    date: today
}, {
    name: "Sulfuras, Hand of Ragnaros",
    sell_in: 0,
    quality: 80,
    category: "Sulfuras",
    date: today
}, {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sell_in: 15,
    quality: 20,
    category: "Backstage passes",
    date: today
}, {
    name: "Conjured Mana Cake",
    sell_in: 3,
    quality: 6,
    category: "Conjured",
    date: today
}]
showItems(inventory)

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const item = {
        name: formData.get("item"),
        sell_in: +formData.get("sell_in"),
        quality: +formData.get("quality"),
        date: today,
    }
    inventory = [...inventory, item]
    parseCategory(item)
    checkQuality(item)
    showItems(item)
    form.reset()
})

button.addEventListener("click", event => {
    event.preventDefault()
    inventory.forEach(item => {
        degradeQuality(item)
        checkQuality(item)
        updateSellIn(item)
        showItems(item)
    })
})

function parseCategory(item) {
    if (item.name.includes("Aged Brie") || item.name.includes("aged brie")) {
        item.category = "Aged Brie"
    } else if (item.name.includes("Sulfuras") || item.name.includes("sulfuras")) {
        item.category = "Sulfuras"
    } else if (item.name.includes("Backstage") || item.name.includes("backstage")) {
        item.category = "Backstage passes"
    } else if (item.name.includes("Conjured") || item.name.includes("conjured")) {
        item.category = "Conjured"
    } else {
        item.category = "none"
    }
    return item
}

function showItems(item) {
    main.innerHTML = ``
    inventory.map(item => {
        const $itemList = document.createElement("div")
        $itemList.classList.add("inventory-list")
        $itemList.innerHTML = ` 
            <p>${item.name}</p>
            <p>${item.sell_in}</p>
            <p>${item.quality}</p>
            <p>${item.date}</p>
            <p>${item.category}</p>
            
            `
        return $itemList
    }).forEach(($itemList) => {
        main.append($itemList)

    })
}

function degradeQuality(item) {
    if (item.category === "Sulfuras") {
        return item.quality = 80
    } else if (item.category === "Conjured" && item.sell_in === 0) {
        return item.quality = 0
    } else if (item.category === "Conjured") {
        return item.quality -= 2
    } else if (item.category === "Backstage passes" && item.sell_in === 0) {
        return item.quality = 0
    } else if (item.category === "Backstage passes" && item.sell_in > 10) {
        return item.quality = item.quality + 1
    } else if (item.category === "Backstage passes" && item.sell_in <= 10 && item.sell_in > 5) {
        return item.quality = item.quality + 2
    } else if (item.category === "Backstage passes" && item.sell_in <= 5) {
        return item.quality = item.quality + 3
    } else if (item.category === "Aged Brie") {
        return item.quality = item.quality + 1
    } else if (item.sell_in <= 0) {
        return item.quality -= 2
    } else {
        return item.quality -= 1
    }

}

function updateSellIn(item) {
    if (item.category === "Sulfuras") {
        return item.sell_in = 0
    } else if (item.sell_in > 0) {
        return item.sell_in = item.sell_in - 1
    } else {
        return item.sell_in = 0
    }
}

function checkQuality(item) {
    if (item.category === "Sulfuras") {
        return item.quality = 80
    } else if (item.category === "Aged Brie" && item.quality < 50) {
        return item.quality
    } else if (item.category === "Backstage passes" && item.quality < 50) {
        return item.quality
    } else if (item.quality > 50) {
        return item.quality = 50
    } else if (item.quality <= 0) {
        return item.quality = 0
    } else {
        return item.quality
    }
}

/*
const form = document.querySelector("form")
const table = document.querySelector("table")
const today = new Date().toLocaleDateString("en-US")
// const localStorageItems = localStorage.getItem("addedItem");
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

displayInventory(inventory)


function displayInventory() {
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
}


    form.addEventListener("submit", event => {
        event.preventDefault()
    //    location.reload();
        const formData = new FormData(event.target)

        const newItem = {
            name: formData.get("item-name"),
            sellIn: +formData.get("sell-in"),
            quality: +formData.get("quality"),
            date: formData.get("date-added"),
            category: parseCategory(itemName)
        }
        inventory = [...inventory, newItem]
       // parseCategory(itemName)
      //  qualityCheck(item)
      //  displayInventory(inventory)
    })
        /*       const itemName = formData.get("item-name")
        const sellIn = +formData.get("sell-in")
        const quality = +formData.get("quality")
        const date = formData.get("date-added")
        const category = parseCategory(itemName)
    }
        
        
        const newItem = {
            item: itemName,
            sellIn: +sellIn,
            quality: +quality,
            date: date,
            category: category,
        }
        newInventory = [...inventory, newItem]
        









    inventory.map((items) => {

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

    updateEndOfDay.addEventListener("click", event => {
        
        
      
        inventory.map(item => {

            degradesQuality(item)
            updatesSellIn(item)
            qualityCheck(item)
            
        })
  

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


function degradesQuality(item) {
    if (item.category === "Sulfuras") {
        return item.quality = 80
    } else if (item.category === "Conjured") {
        return item.quality -= 2
    } else if (item.category === "Backstage pass" && item.sellIn === 0) {
        return item.quality = 0
    } else if (item.category === "Backstage pass" && item.sellIn > 10) {
        return item.quality = item.quality + 1
    } else if (item.category === "Backstage pass" && item.sellIn <= 10 && item.sellIn > 5) {
        return item.quality = item.quality + 2
    } else if (item.category === "Backstage pass" && item.sellIn <= 5) {
        return item.quality = item.quality + 3
    } else if (item.category === "Aged Brie") {
        return item.quality = item.quality + 1
    } else if (item.sellIn <= 0) {
        return item.quality -= 2
    } else {
        return item.quality -= 1
    }

}

function updatesSellIn(item) {
    if (item.item === "Sulfuras") {
        return item.sellIn = 0
    } else if (item.sellIn > 0) {
        return item.sellIn = item.sellIn - 1
    } else {
        return item.sellIn = 0
    }
}

function qualityCheck(item) {
    if (item.category === "Sulfuras") {
        return item.quality = 80
    } else if (item.category === "Aged Brie") {
        return item.quality
    } else if (item.quality > 50) {
        return item.quality = 50
    } else if (item.quality < 0) {
        return item.quality = 0
    } else {
        return item.quality
    }
}

clear.addEventListener("click", (event) => {
    localStorage.clear()
    window.location.reload()
})


*/