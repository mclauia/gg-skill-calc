<div class="row action-bar" id="skill-picker">
    <div class="action-bar-skill hot"
        ng-repeat="(key, skill) in skills"
        ng-click="toggleSkillHighlight(skill)"
        ng-class="{'highlighted glowing-border':isSkillHighlighted(skill)}"
        >
        <span class="skill-key fonted">{{key}}</span>
        <div class="minitree">
            <div ng-repeat="upgrade in skill.upgrades" ng-class="{'selected':isSkillUpgradeSelected(upgrade)}">
                <div ng-repeat="subupgrade in upgrade.upgrades" ng-class="{'selected':isSkillUpgradeSelected(subupgrade)}"></div>
            </div>
        </div>
        <div class="hero-icon icon-lg"
            ng-class="[heroId, key]"
            ng-mouseover="showTooltip = true"
            ng-mouseleave="showTooltip = false"
        ></div>
        <skill-tooltip skill="skill" show="showTooltip" hero-id="heroId" key="key"></skill-tooltip>

        <div class="skill-available glowing-border" ng-hide="isFullySelected(skill)">
            <span class="glyphicon glyphicon-plus"></span>
        </div>
        <skill-upgrade upgrades="skill.upgrades" class="fader" ng-show="isSkillHighlighted(skill)"></skill-upgrade>
    </div>


    <div class="action-bar-passive"
        ng-repeat="passiveGroup in passives"
        ng-click="togglePassiveHighlight($index)"
        ng-class="{
            'highlighted glowing-border':isPassiveHighlighted($index),
            'hot available': isPassiveAvailable($index),
            'selected': isPassiveSlotSelected($index),
        }"
        >

        <!-- not available yet; tell them when it is -->
        <div ng-hide="isPassiveAvailable($index)" class="passive-level-req fonted"><span>LVL {{getRequiredLevelForPassive($index)}}</span></div>

        <!-- available, but not highlighted -->
        <div class="passive-icon glowing-border fader" ng-show="isPassiveAvailable($index) && !isPassiveSlotSelected($index)">
            <span class="glyphicon glyphicon-plus"></span>
        </div>

        <!-- available, and highlighted; show the options box -->
        <div class="passive-options fader" ng-show="isPassiveAvailable($index) && isPassiveHighlighted($index)">
            <dl class="passive-option fader"
                ng-repeat="passive in passiveGroup"
                ng-click="selectPassive(passive, $event)"
                ng-class="{'selected': isPassiveSelected(passive), 'hot':!isPassiveSlotSelected($parent.$index)}">
                <dt>{{passive.name}}</dt>
                <dd game-tips desc="passive.desc"></dd>
            </dl>
        </div>

        <!-- selected -->

        <div ng-if="isPassiveSlotSelected($index)" ng-mouseover="hover = true" ng-mouseleave="hover = false">
            <div class="passive-icon">
                <span class="glyphicon glyphicon-ok"></span>
            </div>
            <skill-tooltip skill="getPassiveForSlot($index)" show="hover && !isPassiveHighlighted($index)"></skill-tooltip>
        </div>

    </div>
</div>