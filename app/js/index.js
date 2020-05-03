const menuBtn = $('.js-menuToggle'),
      menu = $('.header__nav');

$(menuBtn).on('click', function() {
    $('.header__nav').toggle();
    $(menuBtn).toggleClass('is-active');
});

$(document).click(function (e) {
    if ( !menuBtn.is(e.target) && !menu.is(e.target) && menu.has(e.target).length === 0) {
        menu.hide();
        menuBtn.removeClass('is-active');
    };
});

$('input[type=password]').on('input', function(e) {
    e.target.type = 'text';
    e.target.value = "*".repeat(e.target.value.length);
});

// custom select
$('select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;
    $this.addClass('select-hidden'); 
    if(($(this).hasClass('small'))) {
        $this.wrap('<div class="select small"></div>');
    } else {
        $this.wrap('<div class="select"></div>');
    }
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
  
    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);
  
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }
  
    var $listItems = $list.children('li');
  
    $styledSelect.click(function(e) {
        // hide header menu
        $('.header__nav').hide();
        $(menuBtn).toggleClass('is-active');
        // hide header menu end
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });
  
    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
    });
  
    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});