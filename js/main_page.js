$(document).ready(function () {

    var fab = document.getElementById("queries");
    var submitQuery = document.getElementById("btn_query_submit");

    var showChat = false;

    alert("loaded...");

    fab.addEventListener("click", function () {
        $("#div_query_submission").slideToggle();
        clearQueryDiv();
        if (showChat)
        {
            $("#icon_close_chat").hide();
            $("#icon_chat").show();
        }
        else
        {
            $("#icon_close_chat").show();
            $("#icon_chat").hide();
        }
        showChat = !showChat;
    });

    submitQuery.addEventListener("click", function () {

        var mail = document.getElementById("email_query").value;
        var name = document.getElementById("name_query").value;
        var query = document.getElementById("ques_query").value;

        if (mail!=="" && name!=="" && query!=="")
        {
            $("#query_loader").css("display","flex");
            $("#query_form").css("display","none");
            $("#query_error_hint").hide();
            uploadQueryData(mail, name, query);
        }
        else
        {
            $("#query_error_hint").show();
        }
    });

});


function uploadQueryData(email, name, query)
{
    var data = {
        mailid : email,
        client : name,
        query : query
    };

    firebase.database().ref('/queries/unsolved/').push().set(data, function (error) {
        if (error)
        {
            alert("Query Data upload Failed");
            $("#query_loader").css("display","none");
            $("#query_form").css("display","block");
        }
        else
        {
            $("#query_loader").css("display","none");
            $("#query_submit_success").css("display", "flex");
            clearQueryDiv();
        }
    });
}

function clearQueryDiv()
{
    document.getElementById("email_query").value = "";
    document.getElementById("name_query").value = "";
    document.getElementById("ques_query").value = "";
    $("#query_form").css("display","show");
    $("#query_submit_success").css("display", "none");
}