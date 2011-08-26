$(function() {

  $('ul#defaults').cutiepie();
  $("dl#color-classes").cutiepie();
  $('ul#colors').cutiepie({
    stroke: "#000",
    pie: {
      stroke_width: 2,
      outer_stroke: "#fff",
      outer_stroke_width: 4
    },
    slice: {
      stroke_width: 5,
      colors: ["#70ceff", "#00a7fe", "#005b8a"]
    }
  });

});