<div class="skill-tooltip fader" ng-show="show">
    <div class="hero-icon icon-sm"
        ng-if="heroId && key"
        ng-class="[heroId, key]"></div>
    <dl>
        <dt>
            <span ng-show="key">{{key | uppercase}} &mdash; </span>
            <span ng-repeat="path in skill.paths track by $index">
                {{path | uppercase}}
                <span ng-show="$index < skill.paths.length - 1">, </span>
                <span ng-show="$index == skill.paths.length - 1"> &mdash; </span>
            </span>
            {{skill.name}}
        </dt>
        <dd ng-bind-html="skill.desc | gameEffects"></dd>
    </dl>
</div>
