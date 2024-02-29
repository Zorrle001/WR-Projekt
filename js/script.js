const pageDots = $(".pageNav ul li");
const pages = $(".page");

var currentPage = 0;
var scrolling = false;

i = 0;

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

for (const dot of pageDots) {
    $(dot).on(
        "click",
        ((i, e) => {
            console.log(i);
            pages[i].scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
            currentPage = i;
            updateNavDots();
        }).bind(i, i)
    );
    i++;
}

window.addEventListener("wheel", (e) => {
    if (scrolling == true) {
        return;
    }

    console.log(e.deltaY);
    if (e.deltaY > 0) {
        //GO DOWN
        if (pages.length > currentPage + 1) {
            currentPage++;
            pages[currentPage].scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
            console.log(currentPage, "GOTO:", pages[currentPage]);
        }
    } else {
        //GO DOWN
        if (currentPage - 1 >= 0) {
            currentPage--;
            pages[currentPage].scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
            console.log(currentPage, "GOTO:", pages[currentPage]);
        }
    }

    scrolling = true;
    updateNavDots();

    setTimeout(() => {
        scrolling = false;
    }, 500);
});

function updateNavDots() {
    pageDots.removeClass("selected");
    $(pageDots[currentPage]).addClass("selected");
}
