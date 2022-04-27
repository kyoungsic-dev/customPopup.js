'use strict';

(function ($) {

  $.fn.customPopup = function (ops) {
    const COOKIES = document.cookie;
    const THIS = this;
    const ID = this.attr('id');
    const DEFAULTS = {
      width: '300px',
      top: 0,
      left: 0,
      period: 1,
      borderColor: '#999999'
    }
    const SETTINGS = $.extend({}, DEFAULTS, ops);
    let popup_wrap = document.createElement('div');
    let popup_img = document.createElement('div');
    let popup_btns = document.createElement('div');
    let img_html = `<img src="${SETTINGS.imgSrc}" alt="${SETTINGS.imgAlt}">`;
    let btns_html = `<button type="button" class="popup__close--period">${SETTINGS.period}일 동안 보지 않기</button><button type="button" class="popup__close">닫기</button>`;

    popup_img.innerHTML = img_html;
    popup_btns.innerHTML = btns_html;

    popup_img.classList.add('popup__img');
    popup_btns.classList.add('popup__btns');

    popup_wrap.append(popup_img);
    popup_wrap.append(popup_btns);


    function setCookies(name, value, expireDays) {
      const TODAY = new Date();
      TODAY.setDate(TODAY.getDate() + expireDays);
      document.cookie = `${name}=${escape(value)}; path=/; expires=${TODAY.toGMTString()};`;
    }

    function checkCookies() {
      if (COOKIES.indexOf(ID + "=done") < 0) {
        // Parse popup
        THIS.append(popup_wrap);

        // add CSS
        $(popup_wrap)
          .css({
            'position': 'fixed',
            'width': SETTINGS.width,
            'top': SETTINGS.top,
            'left': SETTINGS.left,
            'border': `1px solid ${SETTINGS.borderColor}`,
            'z-index': '99999999',
          })
          .find('.popup__img img')
          .css({
            'display': 'block',
            'width': '100%',
          })
          .end()
          .find('.popup__btns')
          .css({
            'background-color': '#fff',
            'display': 'flex',
          })
          .find('button')
          .css({
            'width': '50%',
            'height': '40px',
            'line-height': '40px',
            'font-size': '14px',
            'background-color': '#fff',
            'padding': 0,
            'margin': 0,
            'cursor': 'pointer',
            'border-top': `1px solid ${SETTINGS.borderColor}`,
            'border-left': `none`,
            'border-right': `none`,
            'border-bottom': `none`,
          })
          .end()
          .find('button:first-child')
          .css({
            'border-right': `1px solid ${SETTINGS.borderColor}`
          })
      }
    }

    function init() {
      checkCookies();

      // Event handler
      $(`#${ID} .popup__close`).click(e => {
        THIS.remove();
      })

      $(`#${ID} .popup__close--period`).click(e => {
        setCookies(ID, 'done', parseInt(SETTINGS.period));
        THIS.remove();
      })
    }

    init();


    return this;
  };
})(jQuery);