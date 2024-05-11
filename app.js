var radians = Math.PI / 180;
var totalLetters = 35;
var currentLetter = 0;
var letterAddy = [];
letterAddy[0] = 0;
var letters = [];
var scrollText = $("#scroller").text();
$("#scroller").text("");

function setup() {
  for (var i = 0; i < totalLetters; i++) {
    if (i > 0) {
      letterAddy[i] = letterAddy[i - 1] + 20;
    }
    letters[i] = new Letter(scrollText[currentLetter]);

    $("#scroller").append(letters[i].el);

    if (i > 0) {
      letters[i].x = letters[i - 1].x + letters[i - 1].width + 5;
    }
    else {
      letters[i].x = 0;
    }

    if (i === 0) {
      letters[0].x = 393;
    }
    currentLetter++;
    if (currentLetter === scrollText.length) {
      currentLetter = 0;
    }
  }
}

var Letter = (function() {
  function Letter(letter) {
    this.el = $('<div class="letter">' + letter + "</div>");
    this._x = 0;
    this._y = 0;
    this._rotation = 0;
    this._width = this.el.width();
  }
  
  Object.defineProperty(Letter.prototype, 'width', {
    get: function() {
      return this.el.width() || 10;
    }
  });

  Object.defineProperty(Letter.prototype, 'rotation', {
    get: function() {
      return this._rotation;
    },
    set: function(val) {
      this._rotation = parseInt(val);
      this.el.css({
        transform: "rotate(" + this._rotation + "deg)"
      });
    }
  });
  
  Object.defineProperty(Letter.prototype, 'letter', {
    get: function() {
      return this.el.text();
    },
    set: function(val) {
      this.el.text(val);
      this._width = this.el.width();
    }
  });

  Object.defineProperty(Letter.prototype, 'x', {
    get: function() {
      return this._x;
    },
    set: function(val) {
      this._x = parseInt(val);
      this.el.css({
        left: this._x + "px"
      });
    }
  });

  Object.defineProperty(Letter.prototype, 'y', {
    get: function() {
      return this._y;
    },
    set: function(val) {
      this._y = parseInt(val);
      this.el.css({
        top: this._y + "px"
      });
    }
  });

  return Letter;
})();

setup();

function update() {
  var extraBit, j, speed = 2, freq = 7, offset = 50;
  for (var i = 0; i < totalLetters; i++) {
    letters[i].x -= speed;
    if (letters[i].x <= freq * -1) {
      if (i === 0) {
        j = totalLetters - 1;
        extraBit = 5;
      }
      else {
        j = i - 1;
        extraBit = 0;
      }
      letters[i].x = letters[j].x + letters[j].width + 2 - extraBit;
      letters[i].letter = scrollText[currentLetter];
      currentLetter++;
      if (currentLetter === scrollText.length) {
        currentLetter = 0;
      }
      letterAddy[i] = letterAddy[j] + 15;
    }
    letters[i].y = (Math.sin(letterAddy[i] * radians) * (speed + freq)) + offset;
    letters[i].rotation = (Math.cos(letterAddy[i] * radians) * (speed + freq));
    letterAddy[i] += freq;
    if (letterAddy[i] === radians * 2) {
      letterAddy[i] = 0;
    }
  }
  requestAnimationFrame(update); // silky smooth
  // setTimeout(update, 40); // retro framerate
}

update();