angular.module('skill.service', [
    'patch.service',
    'ngStorage'
])
    /**
     * @ngdoc service
     * @name skill.service:SkillService
     * @requires patch.service:PatchService
     * @requires ngStorage
     * @description
     *  handles data about selected skills and saved skillsets
     */
    .service('SkillService', ['$localStorage', 'PatchService', function($localStorage, PatchService) {
        var $storage = $localStorage.$default({
                selectedSkillUpgrades: [],
                altSkillUpgrades: [],
                selectedPassives: [],
            }),
            that = this; // allows us to alias skill service methods directly (for methods that need 'this')

        /**
         * @ngdoc method
         * @name skill.service#setCurrentHero
         * @methodOf skill.service:SkillService
         * @description sets the current hero id
         * @param {string} heroId the new hero id
         */
        this.setCurrentHero = function(heroId) {
            $storage.heroId = heroId;
        }
        /**
         * @ngdoc method
         * @name skill.service#getCurrentHero
         * @methodOf skill.service:SkillService
         * @description     gets the current hero id
         * @returns {string | Boolean} the hero id or false
         */
        this.getCurrentHero = function() {
            return $storage.heroId || false;
        }
        /**
         * @ngdoc method
         * @name skill.service#selectSkillUpgrade
         * @methodOf skill.service:SkillService
         * @description     Select an upgrade for a skill
         * @param {Object} skill the skill upgrade
         * @param {Object} pair the upgrades pair from the parent
         */
        this.selectSkillUpgrade = function(skill, pair) {
            // find the one that the skill is not
            var siblingName = pair.left.name == skill.name ? pair.right.name : pair.left.name;
            $storage.altSkillUpgrades.push(siblingName);

            // push this skill onto selected skills
            if ($storage.selectedSkillUpgrades.indexOf(skill.name) == -1) {
                $storage.selectedSkillUpgrades.push(skill.name);
            }
        }

        /**
         * @ngdoc method
         * @name skill.service#selectPassive
         * @methodOf skill.service:SkillService
         * @description     Select a passive for a passive slot
         * @param {Object} passive the passive object
         * @param {Object} passiveSlot the index for the passive (0 for level 3, 1 for level 5, 2 for level 7, 3 for level 9)
         */
        this.selectPassive = function(passive, passiveSlot) {
            // push this skill onto selected skills
            $storage.selectedPassives[passiveSlot] = (passive.name);
        }

        /**
         * @ngdoc method
         * @name skill.service#resetSkills
         * @methodOf skill.service:SkillService
         * @description     Resets all selected skills and passives
         */
        this.resetSkills = function() {
            $storage.selectedSkillUpgrades = [];
            $storage.altSkillUpgrades = [];
            $storage.selectedPassives = [];
        }

        /**
         * @ngdoc method
         * @name skill.service#isSkillUpgradeSelected
         * @methodOf skill.service:SkillService
         * @description     Determine whether a particular skill upgrade has been selected
         * @param {Object} skill the skill to check
         * @returns {Boolean} is selected
         */
        this.isSkillUpgradeSelected = function(skill) {
            return $storage.selectedSkillUpgrades.indexOf(skill.name) > -1;
        }
        /**
         * @ngdoc method
         * @name skill.service#isSkillUpgradeSiblingSelected
         * @methodOf skill.service:SkillService
         * @description     Determine whether a particular skill's sibling was selected instead
         * @param {Object} skill the skill upgrade
         * @param {Object} pair the upgrades pair from the parent
         * @returns {Boolean} is sibling selected
         */
        this.isSkillUpgradeSiblingSelected = function(skill, pair) {
            // find the one that the current skill is not
            var siblingName = pair.left.name == skill.name ? pair.right.name : pair.left.name;
            return $storage.selectedSkillUpgrades.indexOf(siblingName) > -1;
        }

        /**
         * @ngdoc method
         * @name skill.service#isPassiveSelected
         * @methodOf skill.service:SkillService
         * @description     Determine whether a particular passive skill has been selected
         * @param {Object} skill the skill upgrade
         * @returns {Boolean} is passive selected
         */
        this.isPassiveSelected = function(skill) {
            return $storage.selectedPassives.indexOf(skill.name) > -1;
        }
        /**
         * @ngdoc method
         * @name skill.service#isPassiveSlotSelected
         * @methodOf skill.service:SkillService
         * @description     Determine whether a particular passive slot has a selection
         * @param {Number} index the passive slot index
         * @returns {Boolean} is passive slot selected
         */
        this.isPassiveSlotSelected = function(index) {
            return !!$storage.selectedPassives[index];
        }

        /**
         * @ngdoc method
         * @name skill.service#isPassiveAvailable
         * @methodOf skill.service:SkillService
         * @description     Determine whether a passive is available for selection (must have advanced the level by selecting upgrades)
         * @param {Number} index the passive slot index
         * @returns {Boolean} is available
         */
        this.isPassiveAvailable = function(index) {
            // level breakpoints are level 3 for slot 0, level 5 for slot 1, level 7 for slot 2, and level 9 for slot 3.
            return (that.getLevelRequired() - 3) / 2 > index;
        }
        /**
         * @ngdoc method
         * @name skill.service#getRequiredLevelForPassive
         * @methodOf skill.service:SkillService
         * @description     Get the required level for a passive slot
         * @param {Number} index the passive slot index
         * @returns {Number} the required level
         */
        this.getRequiredLevelForPassive = function(index) {
            return (2 * index) + 3;
        }

        /**
         * @ngdoc method
         * @name skill.service#getLevelRequired
         * @methodOf skill.service:SkillService
         * @description     Get the overall level required for all skill selections
         * @returns {Number} The overall level required for all skill selections
         */
        this.getLevelRequired = function() {
            // level 1 is no skills selected
            return $storage.selectedSkillUpgrades.length + 2;
        }
        /**
         * @ngdoc method
         * @name skill.service#getSelectedSkillUpgrades
         * @methodOf skill.service:SkillService
         * @description     selectedskills is essentially a timeline; add 2 to the index, and that is the level at which the skill was selected
         * @returns {Array} the selected skill upgrades
         */
        this.getSelectedSkillUpgrades = function() {
            return $storage.selectedSkillUpgrades;
        }
        /**
         * @ngdoc method
         * @name skill.service#getSelectedPassives
         * @methodOf skill.service:SkillService
         * @description     selectedpassives is also essentially a timeline
         * @returns {Array} the selected passives
         */
        this.getSelectedPassives = function() {
            return $storage.selectedPassives;
        }

        /**
         * @ngdoc method
         * @name skill.service#isUpgraded
         * @methodOf skill.service:SkillService
         * @description     a recursive function that checks down a skill tree to find if it contains any selected upgrades
         * @param {Object} skill the skill to check for upgrades
         * @param {Array=} skillNames the set of skill names to check against (allows sliced lookups)
         * @returns {Boolean} whether the skill is upgraded
         */
        this.isUpgraded = function isUpgraded(skill, skillNames) {
            if (!skillNames) {
                skillNames = $storage.selectedSkillUpgrades;
            }
            if (skillNames.indexOf(skill.name) > -1) return true;

            if (skill.upgrades) {
                return isUpgraded(skill.upgrades.left, skillNames) || isUpgraded(skill.upgrades.right, skillNames);
            }

            return false;
        }

        // recursively drill into the skill tree to find a skill, its root ability, and the path to get there from root
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

            // if this isnt the right skill, but we have children to search, then drill through the heavens
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

        /**
         * @ngdoc method
         * @name skill.service#getSkillInfoByName
         * @methodOf skill.service:SkillService
         * @description     will basically extend skill info object with hotkey, upgrade path
         * @param {string} hero the hero id
         * @param {string} skillName the skill name
         * @returns {Object} an extended hero skill object with root skill and upgrade path info
         */
        this.getSkillInfoByName = function(hero, skillName) {
            var heroInfo = PatchService.getCurrent().body.heroes[hero],
                hotkey, i, j, passiveGroup, skillInfo;

            // check hero passives
            for (i = 0; i < heroInfo.passives.length; i++) {
                passiveGroup = heroInfo.passives[i];
                for (j = 0; j < passiveGroup.length; j++) {
                    if (passiveGroup[j].name == skillName) {
                        passiveGroup[j].index = j; // @todo hm does this need to know the slot index too
                        return passiveGroup[j];
                    }
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
            throw new Error('the skill ' + skillName + ' does not exist for the hero ' + hero);
            return false;
        }
        /**
         * @ngdoc method
         * @name skill.service#getSkillByKey
         * @methodOf skill.service:SkillService
         * @description     get a hero skill by its hot key
         * @param {string} key the hotkey (lmb, rmb, q, e, r)
         * @returns {Object} the skill
         */
        this.getSkillByKey = function(key) {
            return PatchService.getCurrent().body.heroes[this.getCurrentHero()].skills[key] || false;
        }

        /**
         * @ngdoc method
         * @name skill.service#exportSelections
         * @methodOf skill.service:SkillService
         * @description     create a url string for this hero and selection set
         */
        this.exportSelections = function() {
            var hash = '', info, j, skillCache;

            for (var i = 0; i < $storage.selectedSkillUpgrades.length; i++) {
                info = that.getSkillInfoByName(that.getCurrentHero(), $storage.selectedSkillUpgrades[i]);
                hash += info.hotkey + '-'; // o__o;;
                hash += info.paths[info.paths.length - 1].charAt(0);
                if (i != $storage.selectedSkillUpgrades.length - 1 || $storage.selectedPassives.length) {
                    hash += '-';
                }
            };
            // @todo this assumes that these passives start from index 0;
            // if someone is silly and has a passive selection gap, itll fill the gap first
            for (var i = 0; i < $storage.selectedPassives.length; i++) {
                info = that.getSkillInfoByName(that.getCurrentHero(), $storage.selectedPassives[i]);
                hash += info.index;
                if (i != $storage.selectedPassives.length - 1) {
                    hash += '-';
                }
            };

            return hash;
        }
        /**
         * @ngdoc method
         * @name skill.service#importSelections
         * @methodOf skill.service:SkillService
         * @description     load a set of selections from a hash
         * @param {string} hash the hash generated from an earlier result of this.exportSelections
         */
        this.importSelections = function(hash) {
            that.resetSkills();

            var split = hash.split('-'),
                thing, key, direction, rootSkillInfo, skillCache = {}, skill, pair,
                passiveIndex = 0, passives = PatchService.getCurrent().body.heroes[this.getCurrentHero()].passives;

            while (split.length) {
                thing = split.shift();
                if (isNaN(parseInt(thing))) {
                    // its skill upgrade info
                    key = thing;
                    direction = split.shift() == 'l' ? 'left' : 'right';
                    rootSkillInfo = that.getSkillByKey(key);
                    if (!skillCache[key]) {
                        skill = rootSkillInfo.upgrades[direction];
                        pair = rootSkillInfo.upgrades;
                    } else {
                        skill = skillCache[key].upgrades[direction];
                        pair = skillCache[key].upgrades;
                    }
                    that.selectSkillUpgrade(skill, pair);
                    // keep track of the last skill node encountered for this key,
                    // in case we encounter the same skill later and need to drill into it
                    skillCache[key] = skill;
                } else {
                    // its a passive index
                    that.selectPassive(passives[passiveIndex][thing], passiveIndex);
                    passiveIndex++;
                }
            }
        }
    }]);