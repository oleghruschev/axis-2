var a = getRandomInt(6, 9),
  c = getRandomInt(11, 14),
  b = c - a,
  result = '?',
  HEIGHT_CANVAS = 200,
  startX = 0,
  startY = HEIGHT_CANVAS,
  scaleInterval = 39,
  centerScaleInterval = scaleInterval / 2,
  HALF_WIDTH_INPUT = 10;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function(e) {
  var context = canvas.getContext('2d'),
  centerLine1 = a * centerScaleInterval,
  centerLine2 = centerScaleInterval * b + a * scaleInterval,
  heightLine1 = HEIGHT_CANVAS - 25 * a,
  heightLine2 = HEIGHT_CANVAS - 25 * b;
  finishLine1 = a * scaleInterval,
  finishLine2 = c * scaleInterval,

  $('.task-value').html('<span class="value1">' + a + '</span> + <span class="value2">'
   + b + '</span> = <span class="result">' + result + '</span>');

  showLine1();

  //Отображение первой линии с инпутом
  function showLine1() {
    context.bezierCurveTo(startX, startY, centerLine1, heightLine1, finishLine1, startY);
    context.lineTo(finishLine1 -4, 184);
    context.lineTo(finishLine1, HEIGHT_CANVAS);
    context.lineTo(finishLine1 -15, 192);
    context.lineTo(finishLine1, HEIGHT_CANVAS);
    context.strokeStyle = "#c85a99";
    context.lineWidth = 2.6;
    context.stroke();
    $('.inp1').show();
    value1Retreat()
    $('.inp1').on('keypress', setValue1).on('keydown', function(e) {
      if(e.which == 8 ) {
      	$(this).removeClass('red');
      }
    });
  }

  //Проверка правильности введеного числа и его отображение, либо отображение ошибки.
  function setValue1(e) {
    if(e.which != 13  && (e.which < 48 || e.which > 57)) return false;
    if(e.which == 13) {
      if($(this).val() == '') return false
    	if($(this).val() == a) {
	    	$(this).replaceWith('<span class="inp1">' + a + '</span>');
	    	value1Retreat()
	    	$('.value1').removeClass('orange');
	    	showLine2();
	    } else {
	    	$(this).addClass('red');
	    	$('.value1').addClass('orange');
	    }
    }
  }

  //Положение инпута в соответствии с линией.
  function value1Retreat() {
    $('.inp1').css({
    	'bottom' : a * 12,
    	'left' : centerLine1 - HALF_WIDTH_INPUT
    });
  }

  //Отображение второй линии
  function showLine2() {
    context.bezierCurveTo(a * scaleInterval , startY, centerLine2, heightLine2, finishLine2, startY);
    context.lineTo(finishLine2 -4, 184);
    context.lineTo(finishLine2, HEIGHT_CANVAS);
    context.lineTo(finishLine2 -15, 192);
    context.lineTo(finishLine2, HEIGHT_CANVAS);
    context.stroke();
    $('.inp2').show().focus();
    value2Retreat();
    $('.inp2').on('keypress', setValue2).on('keydown', function(e) {
      if(e.which == 8 ) {
      	$(this).removeClass('red');
      }
    });
  }

  //Проверка правильнсоти второго введеного числа
  function setValue2(e) {
    if(e.which != 13  && (e.which < 48 || e.which > 57)) return false;
    if(e.which !== 13) return
    if($(this).val() == b) {
    	$(this).replaceWith('<span class="inp2">' + b + '</span>');
    	value2Retreat()
    	$('.value2').removeClass('orange');
    	totals();
    } else {
    	$(this).addClass('red');
    	$('.value2').addClass('orange');
    }
  }

  //Положение второго инпута в соответсвии с линией
  function value2Retreat() {
    $('.inp2').css({
    		'bottom' : 12 * b,
    		'left' : centerLine2 - HALF_WIDTH_INPUT
    })
  }

  //Показ инпута для ввода результата
  function totals() {
    $('.result').replaceWith('<input class="inp3" type="text" maxlength="2"/>');
    $('.inp3').focus();
    $('.inp3').on('keypress', setValue3).on('keydown', function(e) {
      if(e.which == 8 ) {
      	$(this).removeClass('red');
      }
    });
  }

  //Проверка правильности введенного результата
  function setValue3(e) {
    if(e.which != 13  && (e.which < 48 || e.which > 57)) return false;
    if(e.which !== 13) return
    if($(this).val() == c) {
    	$(this).replaceWith('<span class="result">' + c + '</span>');
    	$('.done').show();
    } else {
    	$(this).addClass('red');
    }
   }

   $('.done-btn').click(function() {
     location.reload();
   });
});
