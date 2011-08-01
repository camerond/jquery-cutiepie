/*

jQuery Cherry Pie Plugin
version 0.1

Copyright (c) 2011 Cameron Daigle, http://camerondaigle.com

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function($) {

  var opts;

  $.fn.cherrypie = function(options) {
    var defaults = {
      stroke: "#fff",
      pie: {
        stroke_width: 4
      },
      slice: {
        stroke_width: 2,
        colors: ["#e42929"]
      }
    };
    return this.each(function() {
      var cherrypie = {};
      cherrypie.el = $(this);
      cherrypie.opts = $.extend(true, defaults, options);
      cherrypie.graph = initGraph.call(cherrypie);
      cherrypie.values = parseData.call(cherrypie);
      drawPie.call(cherrypie);
    });

  };

  function initGraph() {
    var cherrypie = this;
    var $el = cherrypie.el;
    $el.addClass('cherrypie');
    cherrypie.opts.w = $el.width();
    cherrypie.opts.h = $el.height();
    $el.children().hide();
    return Raphael($el.attr('id'), cherrypie.opts.w, cherrypie.opts.h);
  }

  function parseData() {
    var cherrypie = this,
        amounts = [],
        total = 0,
        val;
    var parsers = {
      'ul': function() {
        cherrypie.el.find('li').each(function() {
          val = parseInt($(this).text(), 10);
          amounts.push(val);
          total += val;
        });
      }
    };
    parsers.ol = parsers.ul;
    parsers[cherrypie.el[0].tagName.toLowerCase()]();
    return getValues(amounts, total);
  };

  function drawPie() {
    var cherrypie = this,
        opts = cherrypie.opts,
        x = opts.w / 2,
        y = opts.h / 2,
        r = (opts.w - opts.pie.stroke_width*2)/2,
        x1 = x + r,
        y1 = y,
        pi = Math.PI,
        colors = opts.slice.colors,
        long_arc = 0,
        rad = 0,
        x2, y2;
    cherrypie.graph.circle(x, y, r).attr({
      stroke: opts.stroke,
      "stroke-width": opts.pie.stroke_width
    });
    for (var i = 0, max = cherrypie.values.length; i < max; i++) {
      rad += cherrypie.values[i].rad;
      long_arc = cherrypie.values[i].rad > pi ? 1 : 0;
      x2 = x + Math.cos(rad) * r;
      y2 = y - Math.sin(rad) * r;
      fill_color = opts.slice.colors[i] ? opts.slice.colors[i] : opts.slice.colors[0];
      cherrypie.graph.path(["M", x, y, "L", x1, y1, "A", r, r, 0, long_arc, 0, x2, y2, "z"]).attr({
        fill: fill_color,
        stroke: opts.stroke,
        "stroke-width": opts.slice.stroke_width,
        "stroke-linejoin": "round"
      });
      x1 = x2;
      y1 = y2;
    }
  }

  function getValues(amounts, total) {
    var values = [],
        pi = Math.PI,
        rad;
    for (var i = 0, max = amounts.length; i < max; i++) {
      rad = amounts[i] / total * (2*pi);
      values.push({
        "value": amounts[i],
        "rad": rad
      });
    }
    return values;
  }

})(jQuery);