// handles data about selected skills and saved skillsets
angular.module('skill.service', [
    'patch.service',
    'ngStorage'
])
    .service('SkillService', ['$localStorage', 'PatchService', function($localStorage, PatchService) {
        var $storage = $localStorage.$default({
                selectedSkillUpgrades: [],
                altSkillUpgrades: [],
                selectedPassives: [],
            }),
            that = this; // allows us to alias skill service methods directly (for methods that need 'this')

        this.getHero = function() {
            return $storage.heroId || false;
        }
        this.selectSkillUpgrade = function(skill, pair) {
            // find the one that the skill is not
            var siblingName = pair.left.name == skill.name ? pair.right.name : pair.left.name;
            $storage.altSkillUpgrades.push(siblingName);

            // push this skill onto selected skills
            if ($storage.selectedSkillUpgrades.indexOf(skill.name) == -1) {
                $storage.selectedSkillUpgrades.push(skill.name);
            }
        }
        this.selectPassive = function(passive, passiveSlot) {
            // push this skill onto selected skills
            $storage.selectedPassives[passiveSlot] = (passive.name);
        }

        this.resetSkills = function() {
            $storage.selectedSkillUpgrades = [];
            $storage.selectedPassives = [];
        }

        this.isSkillUpgradeSelected = function(skill) {
            return $storage.selectedSkillUpgrades.indexOf(skill.name) > -1;
        }
        this.isSkillUpgradeSiblingSelected = function(skill, pair) {
            // find the one that the current skill is not
            var siblingName = pair.left.name == skill.name ? pair.right.name : pair.left.name;
            return $storage.selectedSkillUpgrades.indexOf(siblingName) > -1;
        }

        this.isPassiveSelected = function(skill) {
            return $storage.selectedPassives.indexOf(skill.name) > -1;
        }
        this.isPassiveSlotSelected = function(index) {
            return !!$storage.selectedPassives[index];
        }

        this.isPassiveAvailable = function(index) {
            // level breakpoints are level 3 for slot 0, level 5 for slot 1, level 7 for slot 2, and level 9 for slot 3.
            return (that.getLevelRequired() - 3) / 2 > index;
        }
        this.getRequiredLevelForPassive = function(index) {
            return (2 * index) + 3;
        }

        this.getLevelRequired = function() {
            // level 1 is no skills selected
            return $storage.selectedSkillUpgrades.length + 2;
        }
        // selectedskills is essentially a timeline; add 2 to the index, and that is the level at which the skill was selected
        this.getSelectedSkillUpgrades = function() {
            return $storage.selectedSkillUpgrades;
        }
        // same
        this.getSelectedPassives = function() {
            return $storage.selectedPassives;
        }

        this.isUpgraded = function isUpgraded(skill, skillNames) {
            if (skillNames.indexOf(skill.name) > -1) return true;

            if (skill.upgrades) {
                return isUpgraded(skill.upgrades.left, skillNames) || isUpgraded(skill.upgrades.right, skillNames);
            }

            return false;
        }

        // drill into the skill tree to find a skill, its root ability, and the path to get there from root
        function skillDrill(node, skillName, path) {
            // if this is the droid we're looking for
            if (node.name == skillName) {
                // return the skill node, extending it with the path we used to get here
                node.paths = [path];
                return node;
            }

            // otherwise, if we're at the leaves and havent found skillName, bail out for this part of the tree
            if (!node.upgrades) {
                return false;
            }

            // if this isnt the right skill, but we have children to search, do it
            var left = skillDrill(node.upgrades.left, skillName, 'left');
            var right = skillDrill(node.upgrades.right, skillName, 'right');

            if (left) {
                if (path) left.paths.unshift(path)
                    else left.root = node;
                return left;
            }
            if (right) {
                if (path) right.paths.unshift(path)
                    else right.root = node;
                return right;
            }

            return false;
        }

        // will basically extend skill info object with hotkey, upgrade path
        this.getSkillInfoByName = function(hero, skillName) {
            var heroInfo = PatchService.getCurrent().body.heroes[hero],
                hotkey, i, j, passiveGroup, skillInfo;

            // check hero passives
            for (i = 0; i < heroInfo.passives.length; i++) {
                passiveGroup = heroInfo.passives[i];
                for (j = 0; j < passiveGroup.length; j++) {
                    if (passiveGroup[j].name == skillName) return passiveGroup[j];
                };
            };
            // check hero skills; if it is a child skill, return info about the left/right path to the skill
            for (hotkey in heroInfo.skills) {
                // check root level skills
                if (heroInfo.skills[hotkey] == skillName) return heroInfo.skills[hotkey];
                // check child skills
                if (skillInfo = skillDrill(heroInfo.skills[hotkey], skillName)) {
                    skillInfo.hotkey = hotkey;
                    return skillInfo;
                }
            }
            throw 'the skill' + skillName + ' does not exist for the hero ' + hero;
            return false;
        }

        this.getSkillByKey = function(key) {
            return PatchService.getCurrent().body.heroes[this.getHero()].skills[key] || false;
        }

    }]);