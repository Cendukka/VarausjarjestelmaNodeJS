$( document ).ready(function() {

    $("#startTime").change(function() {
        var i = $('option:selected', this).index();
        $("#endTime option").show();
        $("#endTime option:lt("+ i +")").hide();
    });
});