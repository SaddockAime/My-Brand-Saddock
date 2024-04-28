//sideMenu

const sideMenu = document.getElementById("sidemenu");
        function openmenu(){
            sideMenu.style.right = "0";
            let scrolled = false;
        window.addEventListener("scroll", function() {
    if (!scrolled) {
        scrolled = true;
        sideMenu.style.display = "none";
    }
});
        }
        function closemenu(){
            sideMenu.style.right = "-200px";
        }
