$(document).ready(function() {
    /* Search providers list */
    regexSearchProviders = [
        "DuckDuckGo",
        "YouTube",
        "Wikipedia",
	"Google"
    ];

    regexSearchPatterns = [
        "!ddg",   // DuckDuckGo
        "!yt",  // YouTube
        "!w",    // Wikipedia
	"!sp"	// Google
    ];

    currentprovider = "shit";

    // Initialize
    changeProvider("DuckDuckGo");

    // Build regex string
    var i = 0;
    while (i < regexSearchPatterns.length) {
        if (i == 0)
            regexString = "(" + regexSearchPatterns[i] + ")";

        if (i > 0)
            regexString = regexString.concat("|(" + regexSearchPatterns[i] + ")");

        i += 1;
    }

    $("#searchInput").keypress(function() {
        var str = $(this).val();
        var regexPattern = new RegExp(regexString);

        if (regexPattern.test(str)) {
            keyword = regexPattern.exec(str);
            if (keyword != null) {
                var i = 0;
                while (i < regexSearchPatterns.length) {
                    if (keyword[0] == regexSearchPatterns[i])
                        changeProvider(regexSearchProviders[i]);

                    i += 1;
                }
            }
        } else {
            changeProvider("DuckDuckGo");
        }
    });

    // On submit form
    $("#searchForm").submit(function(e) {
        e.preventDefault();

        var str = $("#searchInput").val();
        var regexPattern = new RegExp(regexString, "g");

        if (regexPattern.test(str)) {
            newstring = str.replace(regexPattern, "");
        } else {
            newstring = str;
        }

        $("#searchSubmit").attr("value", newstring);
        $("#searchForm")[0].submit();
    });

});

function changeProvider(newprovider) {
    if (newprovider != currentprovider) {
        currentprovider = newprovider;

        $("#searchIcon").fadeOut(250, function() {
            $("#searchIcon").attr("src", "images/" + currentprovider + ".ico");
            $("#searchIcon").fadeIn(250);
        });

        /* Providers */
        switch(currentprovider) {
            case "DuckDuckGo":
                $("#searchForm").attr("action", "https://duckduckgo.com");
                $("#searchSubmit").attr("name", "q");
                break;
            case "YouTube":
                $("#searchForm").attr("action", "http://youtube.com/results");
                $("#searchSubmit").attr("name", "search_query");
                break;
            case "Wikipedia":
                $("#searchForm").attr("action", "http://en.wikipedia.org/w/index.php");
                $("#searchSubmit").attr("name", "search");
                break;
            case "Google":
                $("#searchForm").attr("action", "https://startpage.com/do/metasearch.pl");
                $("#searchSubmit").attr("name", "query");
                break;
        }
    }
}
