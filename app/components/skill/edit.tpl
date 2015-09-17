<div class="row">
    <div class="col-xs-12 form-inline">
        <div class="row hero-card-row">
            <div class="col-xs-12">
                <div class="hero-card-box" ng-repeat="hero in heroes">
                    <div class="hero-card hero-portrait hot" ng-class="[hero.id, {'selected': selectedHero.name == hero.name}]" ng-click="changeHero(hero)">
                        <span class="hero-card-name fonted">{{hero.name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <h1>Skill Calculator <small>for</small> {{selectedHero.name}}</h1>
        <p class="help-block">Choose a skill to "level up" your hero. Choose passives at levels 3, 5, 7, and 9.

        </p>
        <div class="row">
            <div class="col-xs-12">
                <label>Level:</label>
                <progressbar max="max = 10" value="level = getSelectedSkillUpgrades().length + 1"><strong>{{level}}</strong></progressbar>
                <button class="btn btn-default" type="button" ng-click="resetSkills()">Reset Skills</button>
                <div class="input-group">
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button" ng-click="exportSelections()">Export Skills</button>
                    </span>
                    <input type="text" class="form-control export" ng-model="exported" ng-keypress="type($event)">
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button" ng-click="importSelections()">Import Skills</button>
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row skill-picker-row">
    <div class="col-xs-10 col-xs-offset-2">
        <skill-picker skills="selectedHero.skills" hero-id="selectedHero.id" passives="selectedHero.passives"></skill-picker>
    </div>
</div>
<div class="row">
    <div class="col-xs-12">
        <skill-timeline skills="selectedHero.skills" hero-id="selectedHero.id" passives="selectedHero.passives"></skill-timeline>
        <div class="input-group">
            <span class="input-group-btn">
                <button class="btn btn-default" type="button" ng-click="exportSelections()">Export Skills</button>
            </span>
            <input type="text" class="form-control export" ng-model="exported" ng-keypress="type($event)">
        </div>
    </div>
</div>
