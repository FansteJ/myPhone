var balance = 0;
var perClick = 1;
var rate = 0;
var nextUpgrade = 2;
var nextUpgradeCost = 25;
var nextFactory = 2;
var nextFactoryCost = 500;
var upgrade = 2;
var cookieUpgrades;
var factoryUpgrades;
var cookieBalance;
var cookieRate;
var cookie;
var pClick;
var prestigeCost = 1000;
var prestigeLevel = 0;
var prestigeBtn;


function initialize() {
    cookieUpgrades = document.getElementById("cookie-upgrades");
    cookieUpgrades.children[0].style.opacity = "0.5";
    cookieUpgrades.children[0].onclick = buyCookieUpgrade;
    cookieUpgrades.children[0].title = `Price: ${nextUpgradeCost} 🍪\nNew per click rate: +${perClick * 2}\nShortcut: U`;
    factoryUpgrades = document.getElementById("factory-upgrades");
    factoryUpgrades.children[0].style.opacity = "0.5";
    factoryUpgrades.children[0].onclick = buyFactoryUpgrade;
    factoryUpgrades.children[0].title = `Price: ${nextFactoryCost} 🍪\nNew rate: 5 / s\nShortcut: F`;
    cookieBalance = document.getElementById("cookie-balance");
    cookieRate = document.getElementById("cookie-rate");
    cookie = document.getElementById("cookie-click");
    cookie.title = "🍪Click me!🍪";
    pClick = document.getElementById("per-click");
    pClick.innerHTML = `Per click: +${perClick}`;
    cookieBalance.innerHTML = balance;
    cookieRate.innerHTML = rate + " / s";
    prestigeBtn = document.getElementById("prestige-btn");
    prestigeBtn.title = `Purchase to unlock new possibilities!\nCareful: Purchasing prestige resets balance and upgrades!\nPrice: ${prestigeCost} 🍪\nShortcut: P`;
    prestigeBtn.innerHTML = `🏆 Prestige ${prestigeLevel + 1}`;

    document.addEventListener("keydown", (event) => {
        const key = event.key.toLowerCase();
        if (key === "u")
            buyCookieUpgrade();
        else if (key === "p")
            prestige();
        else if (key === "f")
            buyFactoryUpgrade();
    });

    setInterval(() => {
        balance += rate / 5;
        cookieBalance.innerHTML = balance;
    }, 200);
}



function addCookies(event) {
    balance += perClick;
    cookieBalance.innerHTML = balance;

    cookie.classList.add("clicked");
    setTimeout(() => {
        cookie.classList.remove("clicked");
    }, 100);


    const floatText = document.createElement("div");
    floatText.className = "floating-text";
    floatText.innerText = `+${perClick}🍪`;
    const container = document.getElementById("floating-texts");
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    floatText.style.left = x + "px";
    floatText.style.top = y + "px";
    container.appendChild(floatText);

    setTimeout(() => {
        floatText.remove();
    }, 1000);
}

function buyCookieUpgrade() {
    if (balance < nextUpgradeCost)
        return false;

    balance -= nextUpgradeCost;
    cookieBalance.innerHTML = balance;
    perClick *= upgrade;
    pClick.innerHTML = `Per click: +${perClick}`;

    var newUpgrade = document.createElement("div");
    newUpgrade.innerHTML = `<img src="pictures/cookieUpgrade.png" alt="Cookie upgrade"> Cookie ${nextUpgrade}`;
    newUpgrade.onclick = buyCookieUpgrade;
    newUpgrade.style.opacity = "0.5";
    newUpgrade.title = `Price: ${nextUpgradeCost * upgrade} 🍪\nNew per click rate: +${perClick * upgrade}\nShortcut: U`;

    cookieUpgrades.children[nextUpgrade - 2].style.opacity = "1";
    cookieUpgrades.children[nextUpgrade - 2].onclick = null;
    cookieUpgrades.children[nextUpgrade - 2].style.cursor = "default";
    cookieUpgrades.children[nextUpgrade - 2].title = "Already upgraded ✅";
    nextUpgrade++;
    nextUpgradeCost *= upgrade;
    cookieUpgrades.appendChild(newUpgrade);
}

function buyFactoryUpgrade() {
    if (balance < nextFactoryCost)
        return false;

    balance -= nextFactoryCost;
    cookieBalance.innerHTML = balance;
    if (nextFactory == 2) {
        rate = 5;
    } else {
        rate *= upgrade;
    }
    cookieRate.innerHTML = rate + " / s";
    nextFactoryCost *= upgrade;

    var newFactory = document.createElement("div");
    newFactory.onclick = buyFactoryUpgrade;
    newFactory.innerHTML = `<img src="pictures/factory.png" alt="Factory upgrade"> Factory ${nextFactory}`;
    newFactory.style.opacity = "0.5";
    newFactory.title = `Price: ${nextFactoryCost} 🍪\nNew rate: ${rate * upgrade} / s\nShortcut: F`;

    factoryUpgrades.children[nextFactory - 2].style.opacity = "1";
    factoryUpgrades.children[nextFactory - 2].onclick = null;
    factoryUpgrades.children[nextFactory - 2].style.cursor = "default";
    factoryUpgrades.children[nextFactory - 2].title = "Already upgraded ✅";
    nextFactory++;
    factoryUpgrades.appendChild(newFactory);
}

function prestige() {
    if (balance < prestigeCost)
        return false;
    balance = 0;
    rate = 0;
    perClick = 1;
    nextUpgrade = 2;
    nextUpgradeCost = 25;
    nextFactory = 2;
    nextFactoryCost = 500;
    cookieBalance.innerHTML = balance;
    cookieRate.innerHTML = rate + " / s";
    factoryUpgrades.children[0].style.opacity = "0.5";
    factoryUpgrades.children[0].onclick = buyFactoryUpgrade;
    factoryUpgrades.children[0].style.cursor = "pointer";
    factoryUpgrades.children[0].title = `Price: ${nextFactoryCost} 🍪\nNew rate: 5 / s`;
    cookieUpgrades.children[0].style.opacity = "0.5";
    cookieUpgrades.children[0].onclick = buyCookieUpgrade;
    cookieUpgrades.children[0].style.cursor = "pointer";
    upgrade += 1;
    prestigeLevel++;
    cookieUpgrades.children[0].title = `Price: ${nextUpgradeCost} 🍪\nNew per click rate: +${perClick * upgrade}`;
    pClick.innerHTML = `Per click: +${perClick}`;
    while (factoryUpgrades.children.length > 1)
        factoryUpgrades.removeChild(factoryUpgrades.lastChild);
    while (cookieUpgrades.children.length > 1)
        cookieUpgrades.removeChild(cookieUpgrades.lastChild);

    prestigeBtn.innerHTML = `🏆 Prestige ${prestigeLevel + 1}`;
    prestigeCost *= 5;
    prestigeBtn.title = `Purchase to unlock new possibilities!\nCareful: Purchasing prestige resets balance and upgrades!\nPrice: ${prestigeCost} 🍪\nShortcut: P`;
}