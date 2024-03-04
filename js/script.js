const pageDots = $(".pageNav ul li");
const pages = $(".page");
const videos = $("video");

for (const video of videos) {
    video.load();
}

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
            const lastVideo = videos[currentPage - 1];
            lastVideo != null ? lastVideo.pause() : undefined;
            currentPage = i;
            const newVideo = videos[currentPage - 1];
            newVideo != null
                ? ((newVideo.currentTime = 0), newVideo.play())
                : undefined;
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
            const lastVideo = videos[currentPage - 1];
            lastVideo != null ? lastVideo.pause() : undefined;
            currentPage++;
            const newVideo = videos[currentPage - 1];
            newVideo != null
                ? ((newVideo.currentTime = 0), newVideo.play())
                : undefined;
            pages[currentPage].scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
            console.log(currentPage, "GOTO:", pages[currentPage]);
        }
    } else {
        //GO UPd
        if (currentPage - 1 >= 0) {
            const lastVideo = videos[currentPage - 1];
            lastVideo != null ? lastVideo.pause() : undefined;
            currentPage--;
            const newVideo = videos[currentPage - 1];
            newVideo != null
                ? ((newVideo.currentTime = 0), newVideo.play())
                : undefined;
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
