# eesterlein.github.io

Personal portfolio and resume site for Elissa Esterlein, data analyst in Gunnison, Colorado.

Live at **https://eesterlein.github.io/**

Plain HTML, CSS, and JavaScript with no build step. The hero's topographic map is generated in the browser with value noise and marching squares.

- `index.html`: page content (experience, education, contact)
- `app.js`: project and skill data, contour rendering, filtering
- `style.css`: styles, light/dark themes, and a print stylesheet (the print button produces a one-page-style resume)
- `img/`: project screenshots

To add a project, add an entry to the `PROJECTS` array in `app.js`. Projects without an `img` get a generated contour thumbnail.

County-related projects linked here are independent work built from publicly available data. They are not official products of the Gunnison County Assessor's Office or Gunnison County.
