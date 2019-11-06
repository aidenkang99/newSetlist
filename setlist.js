var arr = [];
var hasSwitched = false;

// initializes the "Song" array
$.getJSON( "setlist.json", function( data ) {
    $.each( data, function(k, v) {
        var info = [];
        $.each(v, function(key, value){
            info.push(value);
        });
        var song = new Song(info);
        arr.push(song);
    });

});

// a constructor of Song
function Song(info){
    this.songname = info[0];
    this.artist = info[1];
    this.genre = info[2];
    this.year = info[3];
}


$(document).ready (
	function(){
        display();
    }
);

// dynamically creates li and ul elements
var li = $('<li/>').appendTo('#menu');
var sub_ul = $('<ul/>').appendTo(li);

// called automatically
function display(){
    $("#menu li ul").attr('id', 'list');
    $.each(arr, function (key, value) {
        var sub_li = $('<li/>').html(arr[key].songname+'<br/>'+"Artist: " + arr[key].artist
                                     +'<br/>'+"Genre: "+arr[key].genre+'<br/>'+"Released:  "+ arr[key].year);
        sub_ul.append(sub_li);
    });   
}

// called based on user's requests
function onlyDisplay(){
    var newLi = $('<li/>');
    newLi.attr('id', 'list');
    var sub_ul2 = $('<ul/>').appendTo(newLi);

    $.each(arr, function (key, value) {
        var thisList = document.getElementById("whichGenre");
        var thisGenre = thisList.options[thisList.selectedIndex].value;
        // if the song matches the genre that the user wishes to display
        if (arr[key].genre == thisGenre){
            var sub_li = $('<li/>').html(arr[key].songname+'<br/>'+"Artist: " + arr[key].artist
                                        +'<br/>'+"Genre: "+arr[key].genre+'<br/>'+"Released:  "+ arr[key].year);
            sub_ul2.append(sub_li);
        }
    });
    // replaces the elements with an old one
    $('#list').replaceWith(newLi);
}

// called when the user clicks the submit button
$(document).on('submit', '#dropdown', function(event) {
    event.preventDefault();
    onlyDisplay();
});
