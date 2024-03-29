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
                                        <div class="num text">${i + 1}</div>
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


  


  const toggle = document.getElementById("toggle");
  const html = document.getElementsByTagName("html")[0];
  const body = document.getElementsByTagName("body")[0];
  const navOne = document.getElementsByTagName("nav")[0];
  const navTwo = document.getElementsByTagName("nav")[1];
  

  const setDarkMode = (isDark, transition) => {
    if (transition) {
      html.classList.add("transition-class");
      body.classList.add("transition-class");
      navOne.classList.add("transition-class");
      navTwo.classList.add("transition-class");
      $(".circle").addClass("transition-class");
    } else {
      html.classList.remove("transition-class");
      body.classList.remove("transition-class");
      navOne.classList.remove("transition-class");
      navTwo.classList.remove("transition-class");
      $(".circle").removeClass("transition-class");
    }
    if (isDark == true) {
      toggle.checked = true;
      html.classList.add("dark");

      sessionStorage.setItem("isDarkMode", "true");
    //   $(".toggle").text("Light");
      $(".scrollToTop").addClass("scrollDark");
    } else {
      toggle.checked = false;
      html.classList.remove("dark");

      sessionStorage.setItem("isDarkMode", "false");
    //   $(".toggle").text("Dark");
      $(".scrollToTop").removeClass("scrollDark");
    }
  };

  
  if (sessionStorage.getItem("isDarkMode") != null) {
    if (sessionStorage.getItem("isDarkMode") == "true") {
      setDarkMode(true, false);
    } else {
      setDarkMode(false, false);
    }
  } else {
    
    
    if (window.matchMedia) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setDarkMode(true, true);
      } else {
        setDarkMode(false, true);
      }
    }
    
  }

  
  toggle.addEventListener("change", (e) => {
    e.target.checked ? setDarkMode(true, true) : setDarkMode(false, true);
  });

  
  window.matchMedia("(prefers-color-scheme: dark)").addListener((e) => {
    e.matches ? setDarkMode(true, true) : setDarkMode(false, true);
  });



    



    let filterId = $(".filterButtonActive").attr("id")
    filterContent(filterId);
    themeNum(filterId);


    $("#" + filterList[0]).find(".circle").css("background", "var(--text-color)");
    $("#" + filterList[0]).find(".num").css("color", "var(--bkg-color)");

    $(".rightCol").scroll(function() {
        themeNum(filterId);
        $(".circle").removeClass("transition-class");
    });


    // $( ".scrollToTop" ).click( function() {
    //     $(".scrollToTop").toggleClass('spin');
    // });

    var counter = 0;
    $('.scrollToTop').click(function() {
    counter += 360;
    $('.scrollToTop').css('transform', 'rotate(' + counter + 'deg)')
    });
});



function themeNum(id) {
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
    console.log("working");



    for (let i=0; i < filterList.length; i++) {
                var b   = document.querySelector("#p" + filterList[i]);
                var r   = b.getBoundingClientRect();
                
                if(r.top < $(".scrollTracker").offset().top && r.bottom > $(".scrollTracker").offset().top) {
                    $("#" + filterList[i]).find(".circle").css("background", "var(--text-color)");
                    $("#" + filterList[i]).find(".num").css("color", "var(--bkg-color)");
                    // i = filterList.length + 1;
                } else {
                    $("#" + filterList[i]).find(".circle").css("background", "var(--bkg-color)");
                    $("#" + filterList[i]).find(".circle").css("border-color", "var(--text-color)");
                    $("#" + filterList[i]).find(".num").css("color", "var(--text-color)");
                }
            }

}   



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

        $("#" + filterList[i]).find(".circle").css("border-color", "#1E1E1E");
        $("#" + filterList[i]).find(".num").css("color", "#1E1E1E");
        $("#" + filterList[i]).addClass("numButtonActive");
    }
};

function scrollToProject(id) {
    const element = document.getElementById("p" + id);
    element.scrollIntoView({behavior: "smooth"});
    // $(".circle").removeClass("transition-class");
}



