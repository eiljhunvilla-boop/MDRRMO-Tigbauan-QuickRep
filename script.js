// ==========================
// QuickRep - MDRRMO Tigbauan
// Single JavaScript File
// ==========================

// ---------- HOME PAGE ----------

const sosBtn = document.getElementById("sosBtn");

if (sosBtn) {

    sosBtn.addEventListener("click", () => {

        window.location.href = "report.html";

    });

}

// ---------- REPORT PAGE ----------

const dispatch = document.getElementById("dispatch");
const callno = document.getElementById("callno");
const type = document.getElementById("type");
const customType = document.getElementById("customType");
const locationInput = document.getElementById("location");
const personnel = document.getElementById("personnel");
const vehicle = document.getElementById("vehicle");
const driver = document.getElementById("driver");
const generateBtn = document.getElementById("generateBtn");

// Show / Hide Custom Type

if(type){

    type.addEventListener("change",()=>{

        if(type.value==="Custom"){

            customType.style.display="block";
            customType.focus();

        }else{

            customType.style.display="none";
            customType.value="";

        }

    });

}

// Date

function today(){

    const d=new Date();

    return d.toLocaleDateString("en-US",{

        year:"numeric",
        month:"long",
        day:"numeric"

    });

}

// Time

function time(){

    const d=new Date();

    const h=String(d.getHours()).padStart(2,"0");
    const m=String(d.getMinutes()).padStart(2,"0");

    return `${h}${m}H`;

}

// Generate Report

if(generateBtn){

    generateBtn.addEventListener("click",()=>{

        let callType=type.value;

        if(type.value==="Custom"){

            callType=customType.value.trim();

            if(callType===""){

                alert("Please enter a custom Type of Call.");

                customType.focus();

                return;

            }

        }

        const report=
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

        sessionStorage.setItem("report",report);

        window.location.href="summary.html";

    });

}

// Press Enter on Custom Type

if(customType){

    customType.addEventListener("keypress",(e)=>{

        if(e.key==="Enter"){

            generateBtn.click();

        }

    });

}

// ---------- SUMMARY PAGE ----------

const summary=document.getElementById("summary");
const copyBtn=document.getElementById("copyBtn");
const newBtn=document.getElementById("newBtn");

if(summary){

    summary.textContent=sessionStorage.getItem("report") || "No report generated.";

}

// Copy

if(copyBtn){

    copyBtn.addEventListener("click",async()=>{

        try{

            await navigator.clipboard.writeText(summary.textContent);

            copyBtn.innerHTML="✅ Report Copied!";

            setTimeout(()=>{

                copyBtn.innerHTML="📋 Copy Report";

            },2000);

        }catch{

            alert("Unable to copy report.");

        }

    });

}

// New Report

if(newBtn){

    newBtn.addEventListener("click",()=>{

        sessionStorage.removeItem("report");

        window.location.href="index.html";

    });

}