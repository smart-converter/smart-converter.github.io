/* ===========================
   UNIVERSAL CONVERTER ENGINE
=========================== */

// Select all converter forms on page
document.querySelectorAll(".converter").forEach(converter => {
    
    const input = converter.querySelector(".input");
    const output = converter.querySelector(".output");
    const fromUnit = converter.querySelector(".from-unit");
    const toUnit = converter.querySelector(".to-unit");

    // When user types or changes units — recalculate
    input.addEventListener("input", convert);
    fromUnit.addEventListener("change", convert);
    toUnit.addEventListener("change", convert);

    function convert() {

        let value = parseFloat(input.value);
        if (isNaN(value)) {
            output.value = "";
            return;
        }

        let from = fromUnit.value;
        let to = toUnit.value;

        output.value = calculate(from, to, value);
    }
});


/* ===========================
   FORMULAS FOR ALL CONVERTERS
=========================== */

function calculate(from, to, value) {
    
    // If the units are the same → no conversion needed
    if (from === to) return value;

    /* ------- LENGTH (meters base) ------- */
    const length = {
        m: 1,
        km: 1000,
        cm: 0.01,
        mm: 0.001,
        mi: 1609.34,
        yd: 0.9144,
        ft: 0.3048,
        in: 0.0254
    };

    if (length[from] !== undefined && length[to] !== undefined) {
        return round(value * (length[to] / length[from]));
    }

    /* ------- WEIGHT (kilograms base) ------- */
    const weight = {
        kg: 1,
        g: 0.001,
        mg: 0.000001,
        lb: 0.453592,
        oz: 0.0283495
    };

    if (weight[from] !== undefined && weight[to] !== undefined) {
        return round(value * (weight[to] / weight[from]));
    }

    /* ------- SPEED (m/s base) ------- */
    const speed = {
        "m/s": 1,
        "km/h": 0.277778,
        "mph": 0.44704,
        "ft/s": 0.3048
    };

    if (speed[from] !== undefined && speed[to] !== undefined) {
        return round(value * (speed[to] / speed[from]));
    }

    /* ------- AREA (square meters base) ------- */
    const area = {
        "m2": 1,
        "km2": 1_000_000,
        "cm2": 0.0001,
        "mm2": 0.000001,
        "ft2": 0.092903,
        "yd2": 0.836127
    };

    if (area[from] !== undefined && area[to] !== undefined) {
        return round(value * (area[to] / area[from]));
    }

    /* ------- VOLUME (liters base) ------- */
    const volume = {
        L: 1,
        mL: 0.001,
        m3: 1000,
        gal: 3.78541,
        qt: 0.946353,
        pt: 0.473176,
        cup: 0.24
    };

    if (volume[from] !== undefined && volume[to] !== undefined) {
        return round(value * (volume[to] / volume[from]));
    }

    /* ------- TEMPERATURE ------- */
    if (from === "c" && to === "f") return round((value * 9/5) + 32);
    if (from === "f" && to === "c") return round((value - 32) * 5/9);
    if (from === "c" && to === "k") return round(value + 273.15);
    if (from === "k" && to === "c") return round(value - 273.15);
    if (from === "f" && to === "k") return round((value - 32) * 5/9 + 273.15);
    if (from === "k" && to === "f") return round((value - 273.15) * 9/5 + 32);

    /* ------- STATIC CURRENCY RATES (offline) ------- */
    const currency = {
        usd: 1,
        eur: 1.07,
        gbp: 1.27,
        uah: 0.025,
        cad: 0.74,
        aud: 0.68
    };

    if (currency[from] !== undefined && currency[to] !== undefined) {
        return round(value * (currency[to] / currency[from]));
    }

    /* ------- If no match ------- */
    return value;
}


/* ===========================
   ROUNDING HELPER
=========================== */
function round(num) {
    return Math.round(num * 100000) / 100000;
}
