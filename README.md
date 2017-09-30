# TodoCQRS

TodoCQRS ist ein Versuch, ein Projekt mit dem CQRS-Pattern durchzuführen, um die Konsequenzen des Patterns auszuprobieren und zu verstehen.
Die Basis stellen die simplen Anforderungen den bekannten [TodoMVC](https://github.com/tastejs/todomvc)-Projekts, von dem auch das Frontend eiskalt geklaut wurde (-> [VanillaES6](https://github.com/tastejs/todomvc/tree/master/examples/vanilla-es6)).

Technische Basis für die Umsetzung von CQRS im Backend ist [.NET-Core](https://github.com/dotnet/core).
Die UI-Dateien werden gebuilded mit [Babel](https://github.com/babel/babel) in [Gulp.js](https://github.com/gulpjs/gulp) und mit dem [Require.js](https://github.com/requirejs/requirejs)-Module-Loader geladen.
