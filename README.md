# gg-skill-calc

An AngularJS single-page skill calculator for Gigantic, which uses a binary tree of height 2 as a collection of potential upgrade paths for a set of 5 root level skills (plus 4 sets of passives that are binary choices at each step)

## building
App source is built using Grunt, for installing bower components, compiling less, squashing templates together, concatting and minifying js, bundling library modules, and formatting it all into the root folder.

## app structure
Code is organized by component or module, not separated by function, where each module directory contains everything pertaining to itself: JavaScript, templates, less files, and images. These are then compiled separately during the build.

## data
The calculator assumes an endpoint that returns data about the current (or earlier) patches, broken down by hero (this is faked with ngMockE2E).

## binding
The calculator itself is completely inter-hero-agnostic and only reacts to the state of the data. As long as the data contract remains the same, the tool is totally flexible.
Skills, upgrades, and passives will work out of the box. The calculator can also scrape skill data for references to predetermined keywords, and alter the display of the data (even adding tooltips for other skills referenced in a skill's text).

## scalability
Adding a new hero requires a new hero object coming back from the hero list, and a new icon sprite and portrait.

## timeline
As you select skill upgrades and passives, a timeline fills up showing you the path you took to get where you are. This is maintained separately, and you can backtrack through the timeline to view a previous snapshot without affecting the currently selected skillset.
