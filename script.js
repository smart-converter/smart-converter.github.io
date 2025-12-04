function convert(type) {
    let input = parseFloat(document.getElementById("inputValue").value);
    let from = document.getElementById("fromUnit").value;
    let to = document.getElementById("toUnit").value;
    let result = 0;
    if (isNaN(input)) {
        document.getElementById("result").innerHTML = "Enter a number";
        return;
    }
    const units = {
        length: { m: 1, km: 0.001, cm: 100, mm: 1000 },
        weight: { kg: 1, g: 1000, lb: 2.20462 },
        volume: { l: 1, ml: 1000, gal: 0.264172 },
        temperature: "temperature"
    };
    if (type === "temperature") {
        if (from === "c" && to === "f") result = input * 1.8 + 32;
        if (from === "f" && to === "c") result = (input - 32) / 1.8;
        if (from === "c" && to === "k") result = input + 273.15;
        if (from === "k" && to === "c") result = input - 273.15;
    } else {
        result = input * (units[type][to] / units[type][from]);
    }
    document.getElementById("result").innerHTML = result.toFixed(6);
}
function openMenu() {
    document.getElementById("sideMenu").classList.add("open");
}

function closeMenu() {
    document.getElementById("sideMenu").classList.remove("open");
}
