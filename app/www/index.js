requirejs(['mods/app', 'mods/events'], function(app, events) {
  app.init();
  return events;
});
