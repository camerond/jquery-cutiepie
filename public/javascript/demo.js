$(function() {

  $('#defaults').cutiepie();
  $("#color-classes").cutiepie();
  $('#colors').cutiepie({
    pie: {
      stroke_width: 5
    },
    slice: {
      stroke_width: 5,
      colors: ["#70ceff", "#00a7fe", "#005b8a"]
    }
  });

});