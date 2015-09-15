<div class="timeline">
    <h3>Skill Timeline</h3>
    <p class="help-block">Click a level number to view a skill upgrade snapshot for that level.</p>
    <table class="table">
        <thead>
            <tr>
                <th><h4>Skill Name</h4></th>
                <th ng-repeat="level in [2,3,4,5,6,7,8,9,10]">
                    <div class="slice-indicator" ng-show="sliceLevel == level"></div>
                    <div class="level-icon iconify"
                        ng-class="{'hot':selectedSkillUpgrades[level - 2], 'highlighted':sliceLevel == level}"
                        ng-click="sliceSkills(level)"
                        >
                        {{level}}
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr ng-repeat="(key, skill) in skills">
                <td>
                    <dl class="timeline-skill hot"
                        ng-class="{'highlighted':hover}"
                        ng-mouseover="hover = true; showTooltip = true"
                        ng-mouseleave="hover = false; showTooltip = false"
                        >
                        <skill-tooltip skill="skill" show="showTooltip" hero-id="heroId" key="key"></skill-tooltip>
                        <dd class="hero-icon icon-sm"
                            ng-class="[heroId, key, {'grey':!hasRootBeenUpgraded(skill)}]"></dd>
                        <dt class="fonted">{{skill.name}}</dt>
                    </dl>
                </td>
                <td ng-repeat="upgradeInfo in selectedSkillUpgradesInfo">
                    <!-- <span class="glyphicon glyphicon-ok"></span> -->
                    <div class="tinytree"
                        ng-show="wasRootOfSkillSelectedAtLevel(skill, $index)"
                        ng-class="{'focus-skill':key == 'r', 'highlighted':$parent.hover, 'hot': sliceLevel >= $index + 2}"
                        ng-mouseover="$parent.hover = true; showUpgradeTooltip = true"
                        ng-mouseleave="$parent.hover = false; showUpgradeTooltip = false"
                    >
                        <skill-tooltip skill="upgradeInfo" show="showUpgradeTooltip"></skill-tooltip>
                        <div ng-class="[upgradeInfo.paths[0], {'focus-skill': key == 'r'}]">
                            <div ng-class="{'selected':upgradeInfo.paths[1] == 'left'}"></div>
                            <div ng-class="{'selected':upgradeInfo.paths[1] == 'right'}"></div>
                        </div>
                    </div>
                </td>
            </tr>
            <tr class="timeline-passive-row">
                <td><h4>Passives</h4></td>
                <td></td>
                <td colspan="2"
                    ng-repeat="passiveName in selectedPassives"
                    ng-init="level = ($index * 2 + 3)"
                    ng-mouseover="showPassiveTooltip = true"
                    ng-mouseleave="showPassiveTooltip = false"
>
                    <div class="level-icon iconify pull-left"
                        ng-class="{'hot':selectedSkillUpgrades[level - 2], 'highlighted':sliceLevel == level}"
                        ng-click="sliceSkills(level)"
                        >
                        {{$index * 2 + 3}}
                    </div>
                    <div class="slice-indicator"
                        ng-show="sliceLevel == level || sliceLevel == level + 1"
                        ng-class="{'plus-one': sliceLevel == level + 1}"></div>
                    <p class="pull-left" ng-class="{'highlighted':sliceLevel >= level}">{{passiveName}}</p>
                    <skill-tooltip skill="getPassiveInfo(passiveName)" show="showPassiveTooltip" ng-if="passiveName"></skill-tooltip>
                </td>
                <td colspan="2" ng-repeat="placeholder in [1,2,3,4]" ng-show="placeholder - selectedPassives.length > 0">
                    <div class="slice-indicator"
                        ng-init="level = ($index * 2 + 3)"
                        ng-show="sliceLevel == level || sliceLevel == level + 1"
                        ng-class="{'plus-one': sliceLevel == level + 1}"></div>
                </td>
            </tr>
        </tbody>
    </table>

    <div class="row">
        <div class="col-xs-12">
            <skill-summary sliced-skills="slicedSkills" skills="skills" hero-id="heroId"></skill-summary>
        </div>
    </div>


</div>



<!--

    @todo needs:
        was an upgrade for this skill selected at this level?

 -->