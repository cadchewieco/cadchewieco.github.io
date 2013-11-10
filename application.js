$(function() {
  $('.what').on('click', function(e) {
    e.preventDefault();
    
    var $answer = $('.answer');
    var $choosables = $('.choosable');
    
    if ($answer.is(':visible')) {
      $choosables.click()
    }
    else {
      $choosables.each(function(index, value) {
        replaceText($(value));
      });
    
      $answer.show()
    }
  });

  $('.choosable').on('click', function(e) {
    replaceText($(e.currentTarget), true, true);
  });

  var replaceText = function($target, mustBeNew, animate) {
    var replacement = chooseNewItem($target.data('type'), $target.text(), mustBeNew);
    if (replacement) {
      if (animate) {
        $target.animate({width: '0'}, {complete: function() {
          $target.text(replacement);
          $target.width('auto');
          var width = $target.width();
          $target.width('0');
          $target.animate({width: width});
        }});    
      }
      else {
        $target.text(replacement);
        $target.width('auto');
      }   
    }
  }

  var chooseNewItem = function(type, currentValue, mustBeNew) {
    var qualities = [
             'premier',
             'leading',
             'industry defining'
            ];
    var subjects = [
            'augmented reality',
            'aircraft scheduling and coordination management',
            'artisanal software',
            'personal emergency watercraft'
             ];
    var companies = [
             'consultancy',
             'firm',
             'company',
             'startup',
             'development house'
            ];
    var locations = ['the Bay Area', 'the Pacific Northwest', 'North America', 'the Northern Hemisphere'];
    
    var array = null;
    var replacement = '';
    
    switch (type) {
      case 'quality':
        array = qualities;
        break;
      case 'subject':
        array = subjects;
        break;
      case 'company':
        array = companies;
        break;
      case 'location':
        array = locations;
        break;
    }
    
    if (array) {
      if (mustBeNew) {
        currentValueIndex = array.indexOf(currentValue);
        if (currentValueIndex > -1)
          array.splice(currentValueIndex, 1);
      }
      
      r = Math.floor(Math.random() * (array.length));
      replacement = array[r];
    }
    
    return replacement;
  }
});