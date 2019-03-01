$(document).ready(function(){

    // Open = true;
    var toggleStates = [true,true,false];

    $("#capture-screens-title").on("click", function(){

        let state_text = (toggleStates[0]) ? "<i class='far fa-plus-square'></i>" : "<i class='far fa-minus-square'></i>";
        toggleStates[0] = !toggleStates[0];
        $("#capture-screens").toggle();
        $("#capture-screens-title").html(state_text + ' Capture Screens')
        
    });

    $("#video-settings-title").on("click", function(){

        let state_text = (toggleStates[1]) ? "<i class='far fa-plus-square'></i>" : "<i class='far fa-minus-square'></i>";
        toggleStates[1] = !toggleStates[1];
        $("#video-settings").toggle();
        $("#video-settings-title").html(state_text + ' Video Settings')
        
    });

    $("#user-settings-title").on("click", function(){

        let state_text = (toggleStates[2]) ? "<i class='far fa-plus-square'></i>" : "<i class='far fa-minus-square'></i>";
        toggleStates[2] = !toggleStates[2];
        $("#user-settings").toggle();
        $("#user-settings-title").html(state_text + ' User Settings')
        
    });

});
