$("h1").html('Press A Key to Start');

var gamePattern = [];
var userClicked = [];
var level = 0;
var started = false;


$(document).keypress(function(){
    if (!started){
        $('h1').text('level '+ level);
        nextSequence();
        started = true;
    }
})

function nextSequence(){
    userClicked = [];
    level++;
    $('h1').text('level ' + level);

    var $divs = $('#container2').children();
    var randomIndex = Math.floor(Math.random() * $divs.length);
    var $selectedDiv = $divs.eq(randomIndex);

    var randomColor = $selectedDiv.attr('id');
    gamePattern.push(randomColor);

    $({brightnessStep: 1}).animate({brightnessStep: 0.5}, {duration: 200,
        step: function(now){
            $selectedDiv.css('filter', 'brightness('+ now +')');
        },

        complete: function(){
            $({brightnessStep: 0.5}).animate({brightnessStep: 1}, {
                duration: 300,
                step: function(now){
                    $selectedDiv.css('filter', 'brightness('+now+')');
                }
            })
        }
    })

}

$('#container2').children().click(function(){
    var userChosen = $(this).attr('id');
    userClicked.push(userChosen);

    var $clickedDiv = $(this);
    $clickedDiv.css('filter', 'brightness(0.5)');
    setTimeout(function() {
        $clickedDiv.css('filter', 'brightness(1)');
    }, 100);

    checkAnswer(userClicked.length - 1);
})


function checkAnswer(currentLevel){
    if (userClicked[currentLevel] === gamePattern[currentLevel]){
        if (userClicked.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else{
        $('h1').text('GameOver! press any key to start again.');
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}