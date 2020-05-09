const nightSwitch = document.getElementById("nightSwitch");
// Uncomment this when using browser darkmode
// const isNight = getComputedStyle(document.documentElement).getPropertyValue("--is-night");
let mode = localStorage.getItem("mode") || "pride"; // Remove "|| pride" when using browser darkmode

const applyMode = (mode) => {
    document.documentElement.setAttribute("user-color-mode", mode);
    const text = mode === "night" ? "🌈 Switch to Pride Theme" : "🌚 Switch to Night Theme";
    nightSwitch.innerHTML = text;
}

applyMode(mode);

nightSwitch.addEventListener("click", () => {
    // Uncomment this when using browser darkmode
    // if(!mode){
    //     mode = isNight === "yes" ? "night" : "pride";
    // }else{
    //     mode = mode === "pride" ? "night" : "pride";
    // }
    mode = mode === "pride" ? "night" : "pride";
    localStorage.setItem("mode", mode);
    applyMode(mode);
});