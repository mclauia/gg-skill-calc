<h3>Skill Summary</h3>
<div class="summary">
    <div ng-repeat="(key, root) in skills" class="summary-skill">
        <div class="action-bar-skill hero-icon icon-lg" ng-class="[heroId, key]"></div>
        <h5>{{key | uppercase}}: {{root.name}}</h5>
        <div ng-repeat="upgrade in getUpgradesForKey(key)">
            <dl>
                <dt>{{upgrade.paths[0] | uppercase}}: {{upgrade.name}}</dt>
                <dd game-tips desc="upgrade.desc"></dd>
            </dl>
        </div>
    </div>
</div>