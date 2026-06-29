// ==========================
// QuickRep - MDRRMO Tigbauan
// ==========================

const home = document.getElementById("home");
const form = document.getElementById("formPage");
const summaryPage = document.getElementById("summaryPage");

const dispatch = document.getElementById("dispatch");
const callno = document.getElementById("callno");
const type = document.getElementById("type");
const customType = document.getElementById("customType");
const locationInput = document.getElementById("location");
const personnel = document.getElementById("personnel");
const vehicle = document.getElementById("vehicle");
const driver = document.getElementById("driver");

const summary = document.getElementById("summary");
const copyBtn = document.getElementById("copyBtn");
const newBtn = document.getElementById("newBtn");

// ==========================
// HOME
// ==========================

document.getElementById("sosBtn").addEventListener("click", () => {

    home.classList.add("hidden");
    form.classList.remove("hidden");

});

// ==========================
// CUSTOM TYPE
// ==========================

type.addEventListener("change", () => {

    if(type.value === "Custom"){

        customType.style.display = "block";
        customType.focus();

    }else{

        customType.style.display = "none";
        customType.value = "";

    }

});

// ==========================
// DATE
// ==========================

function today(){

    const d = new Date();

    return d.toLocaleDateString("en-US",{

        year:"numeric",
        month:"long",
        day:"numeric"

    });

}

// ==========================
// TIME
// ==========================

function time(){

    const d = new Date();

    const h = String(d.getHours()).padStart(2,"0");
    const m = String(d.getMinutes()).padStart(2,"0");

    return `${h}${m}H`;

}

// ==========================
// GENERATE REPORT
// ==========================

document.getElementById("generateBtn").addEventListener("click", () => {

    let callType = type.value;

    if(type.value === "Custom"){

        callType = customType.value.trim();

    }

    if(callType === ""){

        alert("Please enter a custom Type of Call.");
        customType.focus();
        return;

    }

    const report =
`INCIDENT REPORT

Dispatch: ${dispatch.value}

Call #: ${callno.value}

Date: ${today()}

Time of Call: ${time()}

Type of Call: ${callType}

Location: ${locationInput.value}

Responded Personnel: ${personnel.value}

Vehicle: ${vehicle.value}

Driver: ${driver.value}`;

    summary.textContent = report;

    form.classList.add("hidden");
    summaryPage.classList.remove("hidden");

});

// ==========================
// COPY
// ==========================

copyBtn.addEventListener("click", async () => {

    try{

        await navigator.clipboard.writeText(summary.textContent);

        copyBtn.innerHTML = "✅ Report Copied!";

        setTimeout(()=>{

            copyBtn.innerHTML = "📋 Copy Report";

        },2000);

    }catch{

        alert("Unable to copy report.");

    }

});

// ==========================
// NEW REPORT
// ==========================

newBtn.addEventListener("click",()=>{

    location.reload();

});

// ==========================
// ENTER KEY
// ==========================

customType.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        document.getElementById("generateBtn").click();

    }

});