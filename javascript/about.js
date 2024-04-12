//sideMenu
const sideMenu = document.getElementById("sidemenu");
        function openmenu(){
            sideMenu.style.right = "0";
        }
        function closemenu(){
            sideMenu.style.right = "-200px";
        }



//tab-links and tab-contents elements
const tabLinks = document.getElementsByClassName("tab-links");
const tabContents = document.getElementsByClassName("tab-contents");

//opening a tab
function opentab(tabName, event) {
    //removing the active class from all tab links
    for (const tabLink of tabLinks) {
        tabLink.classList.remove("active-link");
    }

    //removing the active class from all tab contents
    for (const tabContent of tabContents) {
        tabContent.classList.remove("active-tab");
    }

    //Adding the active class to the clicked tab link and corresponding tab content
    event.currentTarget.classList.add("active-link");
    const tabContentElement = document.getElementById(tabName);
    if (tabContentElement) {
        tabContentElement.classList.add("active-tab");
    } else {
        console.error(`Tab content with ID "${tabName}" not found.`);
    }
}