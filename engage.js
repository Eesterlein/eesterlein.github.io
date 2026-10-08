// Time-spent check-ins for GoatCounter.
// Sends one event per mark (30s, 2m, 5m) once a visitor has had the page
// visible for that long. Background tabs don't count toward the time.
(function () {
  var MARKS = [[30, '30s'], [120, '2m'], [300, '5m']];
  var visibleSecs = 0, last = Date.now(), wasVisible = !document.hidden, sent = {};

  function tick() {
    var now = Date.now();
    if (wasVisible) visibleSecs += (now - last) / 1000;
    last = now;
    wasVisible = !document.hidden;
    MARKS.forEach(function (m) {
      if (visibleSecs < m[0] || sent[m[1]]) return;
      if (!window.goatcounter || !window.goatcounter.count) return;
      sent[m[1]] = true;
      window.goatcounter.count({
        path: 'stay ' + m[1] + ': ' + location.pathname,
        title: 'Stayed ' + m[1] + '+',
        event: true,
      });
    });
  }

  setInterval(tick, 5000);
  document.addEventListener('visibilitychange', tick);
})();
