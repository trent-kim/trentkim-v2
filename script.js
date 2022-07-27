let trentKim;


let listOfFeaturedProjects = [];
let listOfArchive = [];
let listOfPhotos = [];
let listOfNotes = [];
let listOfAll = [];

let filterList;

// DATA
$.getJSON("data.json", function(data){
    trentKim = data.trentKim;
    for (let i=0; i < trentKim.length; i++) {
        // append each number button for each item in data
        $(".numContainer").append(`<div id="${i}" class="numButton hover" onclick="scrollToProject(this.id)">
                                        <div class="circle"></div>
                                        <div class="num">${i + 1}</div>
                                    </div>`);

        // sort data into corresponding lists
        listOfAll.push(trentKim[i].number);

        if (trentKim[i].type == "Featured Projects") {
            listOfFeaturedProjects.push(trentKim[i].number);
        } else if (trentKim[i].type == "Archive") {
            listOfArchive.push(trentKim[i].number);
        } else if (trentKim[i].type == "Photos") {
            listOfPhotos.push(trentKim[i].number);
        } else if (trentKim[i].type == "Notes") {
            listOfNotes.push(trentKim[i].number);
        };
    };


    let filterId = $(".filterButtonActive").attr("id")
    filterContent(filterId);

    $("#" + filterList[0]).find(".circle").css("background", "black");
    $("#" + filterList[0]).find(".num").css("color", "white");

    $(".rightCol").scroll(function() {

        for (let i=0; i < filterList.length; i++) {
                    var b   = document.querySelector("#p" + filterList[i]);
                    var r   = b.getBoundingClientRect();
                    
                    if(r.top < $(".scrollTracker").offset().top && r.bottom > $(".scrollTracker").offset().top) {
                        $("#" + filterList[i]).find(".circle").css("background", "black");
                        $("#" + filterList[i]).find(".num").css("color", "white");
                        // i = filterList.length + 1;
                    } else {
                        $("#" + filterList[i]).find(".circle").css("background", "white");
                        $("#" + filterList[i]).find(".circle").css("border-color", "black");
                        $("#" + filterList[i]).find(".num").css("color", "black");
                    }
                }
    })
});



function filterContent(id) {
    
    if (id == "featuredProjects") {
        filterList = listOfFeaturedProjects;
    } else if (id == "archive") {
        filterList = listOfArchive;
    } else if (id == "photos") {
        filterList= listOfPhotos;
    } else if (id == "notes") {
        filterList= listOfNotes;
    } else if (id == "all") {
        filterList= listOfAll;
    };

    for (let i=0; i < filterList.length; i++) { 
        
        if(trentKim[filterList[i]].type == "Notes") {
            $(".rightContent").append(`<div id="p${trentKim[filterList[i]].number}" class="project">
                                        <h1>${trentKim[filterList[i]].name}<span class="year">${trentKim[filterList[i]].date}</span></h1>
                                        <div class="projectDescription">
                                            <h2 class="summary">${trentKim[filterList[i]].description}</h2>
                                            <div class="projectDescriptionSpacer"></div>
                                            <div class="projectDetails">
                                                <h1 class="tags">${trentKim[filterList[i]].tags}</h1>
                                                ${trentKim[filterList[i]].credits}
                                            </div>
                                        </div>
                                    </div>`)
        } else {
        $(".rightContent").append(`<div id="p${trentKim[filterList[i]].number}" class="project">
                                        <h1>${trentKim[filterList[i]].name}<span class="year">${trentKim[filterList[i]].date}</span></h1>
                                        <div class="imageScroll">
                                            ${trentKim[filterList[i]].media}
                                        </div>
                                        <div class="projectDescription">
                                            <h2 class="summary">${trentKim[filterList[i]].description}</h2>
                                            <div class="projectDescriptionSpacer"></div>
                                            <div class="projectDetails">
                                                <h1 class="tags">${trentKim[filterList[i]].tags}</h1>
                                                ${trentKim[filterList[i]].credits}
                                            </div>
                                        </div>
                                    </div>`)
        };

        $("#" + filterList[i]).find(".circle").css("border-color", "black");
        $("#" + filterList[i]).find(".num").css("color", "black");
        $("#" + filterList[i]).addClass("numButtonActive");
    }
};

function scrollToProject(id) {
    const element = document.getElementById("p" + id);
    element.scrollIntoView({behavior: "smooth"});
}

