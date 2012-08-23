$(function() {

  $('ul#defaults').cutiepie();
  $("dl#color_classes").cutiepie();
  $('p#array_data').cutiepie({
    parser: "array",
    data_array: ["394", "340"],
    total: 1000,
    stroke: "#fff",
    pie: {
      stroke_width: 2,
      outer_stroke: "#fff",
      outer_stroke_width: 4
    },
    slice: {
      stroke_width: 2,
      colors: ["#70ceff", "#00a7fe", "#005b8a"]
    }
  });

});