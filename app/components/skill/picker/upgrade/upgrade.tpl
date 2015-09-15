<div class="action-bar-upgrade"
    ng-repeat="(side, upgrade) in upgrades"
    ng-click="selectSkillUpgrade(upgrade, $event)"
    ng-class="{'selected':isSelected(upgrade), 'sib-selected':isSiblingSelected(upgrade, upgrades)}">

    <upgrade-branch-lines index="$index" upgrade="upgrade"></upgrade-branch-lines>

    <div class="upgrade-selected" ng-show="isSelected(upgrade)">
        <span class="glyphicon glyphicon-ok"></span>
    </div>

    <dl>
        <dt>{{upgrade.name}}</dt>
        <dd game-tips desc="upgrade.desc"></dd>
    </dl>

    <skill-upgrade upgrades="upgrade.upgrades" class="fader" ng-show="isSelected(upgrade)"></skill-upgrade>
</div>