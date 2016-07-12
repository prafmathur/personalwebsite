$("#tjimg")
    .mouseover(function () {
        $("#c8img").stop(true, true)
        $("#tjdescription").stop(true, true)
        $("#c8img").fadeOut(100, function(){
            $("#tjdescription").fadeIn(200)    
            $("#c8link").hide();
        })
    })
    .mouseout(function () {
        $("#c8img").stop(true, true)
        $("#tjdescription").stop(true, true)
        $("#tjdescription").fadeOut(100, function(){
            $("#c8img").fadeIn(200)   
            $("#c8link").show();
        })
    })

$("#c8img")
    .mouseover(function () {
        $("#c8description").stop(true, true)
        $("#tjimg").stop(true, true)
        $("#tjimg").fadeOut(100, function(){
            $("#c8description").fadeIn(200)
            $("#tjlink").hide();
        })
    })
    .mouseout(function () {
        $("#c8description").stop(true, true)
        $("#tjimg").stop(true, true)
        $("#c8description").fadeOut(100, function(){
            $("#tjimg").fadeIn(200)
            $("#tjlink").show();
        })
    })

