const main = document.querySelector("main")
const form = document.querySelector("form")
const button = document.querySelector("button")
const today = new Date().toLocaleDateString("en-US")
const reset = document.querySelector(".reset")


let inventory = [{
    name: "+5 Dexerity Vest",
    sellIn: 10,
    quality: 20,
    category: "None",
    date: today
}, {
    name: "Aged Brie",
    sellIn: 2,
    quality: 0,
    category: "Aged Brie",
    date: today
}, {
    name: "Elixir of the Mongoose",
    sellIn: 5,
    quality: 7,
    category: "None",
    date: today
}, {
    name: "Sulfuras, Hand of Ragnaros",
    sellIn: 0,
    quality: 80,
    category: "Sulfuras",
    date: today
}, {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 15,
    quality: 20,
    category: "Backstage passes",
    date: today
}, {
    name: "Conjured Mana Cake",
    sellIn: 3,
    quality: 6,
    category: "Conjured",
    date: today
}]
showInventory(inventory)

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const item = {
        name: formData.get("item"),
        sellIn: +formData.get("sellIn"),
        quality: +formData.get("quality"),
        date: today,
    }
    inventory = [...inventory, item]
    parseCategory(item)
    checkQuality(item)
    showInventory(item)
    form.reset()
})

button.addEventListener("click", event => {
    event.preventDefault()
    inventory.forEach(item => {
        degradeQuality(item)
        checkQuality(item)
        updateSellIn(item)
        showInventory(item)
    })
})
reset.addEventListener("click", () => {
    window.location.reload()
})

function showInventory() {
    main.innerHTML = ``
    inventory.map(item => {
        const itemList = document.createElement("div")
        itemList.classList.add("inventory-list")
        itemList.innerHTML = ` 
            <p>${item.name}</p>
            <p>${item.sellIn}</p>
            <p>${item.quality}</p>
            <p>${item.date}</p>
            <p>${item.category}</p>
            `
        return itemList
    }).forEach((itemList) => {
        main.append(itemList)
    })
}

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
        item.category = "None"
    }
    return item
}

function updateSellIn(item) {
    if (item.category === "Sulfuras") {
        return item.sellIn = 0
    } else if (item.sellIn > 0) {
        return item.sellIn = item.sellIn - 1
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

function degradeQuality(item) {
    if (item.category === "Sulfuras") {
        return item.quality = 80
    } else if (item.category === "Conjured") {
        return item.quality -= 2
    } else if (item.category === "Backstage passes" && item.sellIn === 0) {
        return item.quality = 0
    } else if (item.category === "Backstage passes" && item.sellIn > 10) {
        return item.quality = item.quality + 1
    } else if (item.category === "Backstage passes" && item.sellIn <= 10 && item.sellIn > 5) {
        return item.quality = item.quality + 2
    } else if (item.category === "Backstage passes" && item.sellIn <= 5) {
        return item.quality = item.quality + 3
    } else if (item.category === "Aged Brie") {
        return item.quality = item.quality + 1
    } else if (item.sellIn <= 0) {
        return item.quality -= 2
    } else {
        return item.quality -= 1
    }
}