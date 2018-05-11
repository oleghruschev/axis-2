var array  = [6, 7, 8, 9],
  a = array[Math.floor(Math.random() * array.length)],
  b = 5,
  c = a + b,
  result = '?',
  HEIGHT_CANVAS = 200,
  startX = 0,
  startY = HEIGHT_CANVAS,
  scaleInterval = 39,
  centerScaleInterval = scaleInterval / 2,
  HALF_WIDTH_INPUT = 10;


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
    context.lineTo(finishLine1 -8, 184);
    context.lineTo(finishLine1, HEIGHT_CANVAS);
    context.lineTo(finishLine1 -14, 189);
    context.lineTo(finishLine1, HEIGHT_CANVAS);
    context.strokeStyle = "#d586b3";
    context.lineWidth = 2;
    context.stroke();
    $('.inp1').show();
    value1Retreat()
    $('.inp1').on('keydown', setValue1);
  }

  //Проверка правильности введеного числа и его отображение, либо отображение ошибки.
  function setValue1(e) {
    if(e.which == 8 ) {
    	$(this).removeClass('red');
    }
    if(e.which !== 13) return
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
    context.lineTo(finishLine2 -8, 184);
    context.lineTo(finishLine2, HEIGHT_CANVAS);
    context.lineTo(finishLine2 -14, 189);
    context.lineTo(finishLine2, HEIGHT_CANVAS);
    context.stroke();
    $('.inp2').show();
    value2Retreat();
    $('.inp2').on('keydown', setValue2);
  }

  //Проверка правильнсоти второго введеного числа
  function setValue2(e) {
    if(e.which == 8 ) {
    	$(this).removeClass('red');
    }
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
    $('.result').replaceWith('<input class="inp3" type="text" maxlength="2" autofocus/>');
    $('.inp3').on('keydown', setValue3);
  }

  //Проверка правильности введенного результата
  function setValue3(e) {
    if(e.which == 8 ) {
    	$(this).removeClass('red');
    }
    if(e.which !== 13) return
    if($(this).val() == c) {
    	$(this).replaceWith('<span class="result">' + c + '</span>');
    	$('.done').show();
    } else {
    	$(this).addClass('red');
    }
    }
});
