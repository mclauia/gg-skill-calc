angular.module('patch.data', [])    // this mocks an endpoint basically
    .value('PatchData', [
        {
            version: '0.1',
            body: {
                heroes: {
                    tripp: {
                        id: 'tripp',
                        name: 'Tripp',
                        playstyle: 'Speed and stealth',
                        flavor: {
                            text: 'Tripp is supposed to be the living incarnation of lightning, yet the world knows only her exploits as a thief and assassin. Is she rebelling against her heritage, or is there a subtle plan at work?',
                            attribution: 'The Laughing Cowl, House Melkior'
                        },
                        skills: {
                            lmb: {
                                name: 'Lightning Strikes',
                                desc: 'Deliver lightning-fast dagger attacks',
                                upgrades: {
                                    left: {
                                        name: 'Power Surge',
                                        desc: 'Damage increases by [+8% | damage] every hit. (Max [40% | damage], lasts [3s | duration])',
                                        upgrades: {
                                            left: {
                                                name: 'Full Charge',
                                                desc: 'Maxing out Power Surge extends its duration to [10s | duration]',
                                            },
                                            right: {
                                                name: 'Lightning Quick',
                                                desc: 'On hit, gain [+25% movement speed | speed] ([3s | duration]).',
                                            }
                                        }
                                    },
                                    right: {
                                        name: 'Shocking Blades',
                                        desc: 'From stealth, Lighting Strikes deals [2x damage | damage] and interrupts.',
                                        upgrades: {
                                            left: {
                                                name: 'Assassin\'s Credo',
                                                desc: 'Killing target hit by Shocking Blades within [3s | duration] lowers Flashdance\'s cooldown.',
                                            },
                                            right: {
                                                name: 'Unseen Strike',
                                                desc: 'From stealth, inflict [Bleeding |damage] on foes below [50% health | hp].',
                                            }
                                        }
                                    }
                                }
                            },
                            rmb: {
                                name: 'Plasma Blades',
                                desc: 'Throw daggers to inflict ongoing bleed damage.',
                                upgrades: {
                                    left: {
                                        name: 'Hidden Daggers',
                                        desc: 'HOLD [rmb | skill]: Throw more daggers. (Shorter cooldown if you throw fewer daggers.)',
                                        upgrades: {
                                            left: {
                                                name: 'Precision Blades',
                                                desc: 'Your daggers can crit. Move at [normal speed | speed] while throwing daggers.',
                                            },
                                            right: {
                                                name: 'Hidden Killer',
                                                desc: '[rmb | skill] does not break stealth.',
                                            }
                                        }
                                    },
                                    right: {
                                        name: 'Marked for Death',
                                        desc: '[rmb | skill], [lmb | skill] for bonus damage. (Hit same target within [5s | duration].)',
                                        upgrades: {
                                            left: {
                                                name: 'Shattering Blades',
                                                desc: '[rmb | skill], [lmb | skill] breaks armor. ([4s | duration])',
                                            },
                                            right: {
                                                name: 'Grounding',
                                                desc: '[rmb | skill], [lmb | skill] slows and grounds. ([3s | duration])',
                                            }
                                        }
                                    }
                                }
                            },
                            q: {
                                name: 'Electric Slide',
                                desc: 'Glide forward rapidly. Tap again to make a kick attack that launches enemies upward.',
                                upgrades: {
                                    left: {
                                        name: 'Light Speed',
                                        desc: 'Move farther and faster.',
                                        upgrades: {
                                            left: {
                                                name: 'Static Shield',
                                                desc: '[Deflect | deflect] projectiles from the front. ([3s duration | duration])',
                                            },
                                            right: {
                                                name: 'Phantom Slide',
                                                desc: '[q | skill] does not break stealth. ([q | skill], [q | skill] still does.)',
                                            }
                                        }
                                    },
                                    right: {
                                        name: 'Heel Blade',
                                        desc: '[q | skill], [q | skill]: Hitting raises [crit chance to 100% | crit].',
                                        upgrades: {
                                            left: {
                                                name: 'Chain Lightning',
                                                desc: '[q | skill], [q | skill] attacks twice. ([50% damage | damage] for second hit.)',
                                            },
                                            right: {
                                                name: 'Rolling Thunder',
                                                desc: '[q | skill] sends out a wave that [interrupts | interrupt] foes.',
                                            }
                                        }
                                    }
                                }
                            },
                            e: {
                                name: 'Flashdance',
                                desc: 'Become invisible for a short time.',
                                upgrades: {
                                    left: {
                                        name: 'Storm Surge',
                                        desc: '[+25% move speed | speed] while invisible.',
                                        upgrades: {
                                            left: {
                                                name: 'In a Flash',
                                                desc: 'Flashdance is instant and breaks LAUNCH and STUN.',
                                            },
                                            right: {
                                                name: 'Flash Step',
                                                desc: 'HOLD: On release, you teleport a short distance. Invis duration reduced to [3s | duration].',
                                            }
                                        }
                                    },
                                    right: {
                                        name: 'Starburst',
                                        desc: 'On use, [dazes | cc] nearby foes for [2s | duration]. ([+5s cooldown | cd] on Daze.)',
                                        upgrades: {
                                            left: {
                                                name: 'Electrical Storm',
                                                desc: 'On use, creates a [damaging | damage] electrical area. (Lasts [3s | duration])',
                                            },
                                            right: {
                                                name: 'Disorienting Flash',
                                                desc: 'On use, [slows | cc] nearby foes for [3s | duration].',
                                            }
                                        }
                                    }
                                }
                            },
                            r: {
                                name: 'Bladestorm',
                                desc: 'Unleash a flurry of melee attacks that interrupt your target.',
                                upgrades: {
                                    left: {
                                        name: 'In the Zone',
                                        desc: 'On hit, raise your [crit chance to 100% | crit]',
                                    },
                                    right: {
                                        name: 'Resurgence',
                                        desc: 'On use, you regain stamina.',
                                    }
                                }
                            },
                        },
                        passives: [
                            [
                                {
                                    name: 'Killer Instinct',
                                    desc: '[lmb | skill]: +15% damage against foes with less than 50% health.'
                                },
                                {
                                    name: 'Back in a Flash',
                                    desc: '[e | skill]: You can perform Flashdance more often.'
                                },
                            ],
                            [
                                {
                                    name: 'Ambush',
                                    desc: '+20% crit chance and +10% crit damage from behind.'
                                },
                                {
                                    name: 'Acrobatics',
                                    desc: 'Dodging and jumping cost 33% less stamina.'
                                },
                            ],
                            [
                                {
                                    name: 'Precision',
                                    desc: 'Crit chance builds faster.'
                                },
                                {
                                    name: 'En Garde',
                                    desc: '+10 front armor, +20 while attacking.'
                                },
                            ],
                            [
                                {
                                    name: 'Hero\'s Might',
                                    desc: '+10% damage.'
                                },
                                {
                                    name: 'Hero\'s Vitality',
                                    desc: '+15% maximum health.'
                                },
                            ]
                        ]
                    },
                    tyto: {
                        id: 'tyto',
                        name: 'Tyto',
                        playstyle: 'Reflexes and finesse',
                        flavor: {
                            text: 'A swashbuckler with a feral sidekick, Tyto makes an exit wound, then makes an exit.',
                        },
                        skills: {
                            lmb: {
                                name: 'Talon',
                                desc: 'Melee attack combo.',
                                upgrades: {
                                    left: {
                                        name: 'Kith and Keen',
                                        desc: 'Hits build crit chance and focus faster.',
                                        upgrades: {
                                            left: {
                                                name: 'Talon and Fang',
                                                desc: 'When Fang is with you, Talon deals +15% additional damage.',
                                            },
                                            right: {
                                                name: 'Synchronicity',
                                                desc: '[e | skill],[lmb | skill]: You move further and hit harder after using Fang.',
                                            }
                                        }
                                    },
                                    right: {
                                        name: 'Windcutter',
                                        desc: 'Talon sends out a projectile when you miss.',
                                        upgrades: {
                                            left: {
                                                name: 'Footwork',
                                                desc: '[lmb | skill]+[A]/[S]/[D]: Dodge as you attack.',
                                            },
                                            right: {
                                                name: 'Feint',
                                                desc: 'After Dodging, Talon crits and inflicts bleeding. (Once every 5s.)',
                                            }
                                        }
                                    }
                                }
                            },
                            rmb: {
                                name: 'Swoop',
                                desc: 'Powerful leaping attack.',
                                upgrades: {
                                    left: {
                                        name: 'Cut Down',
                                        desc: 'Swoop inflicts 2x damage on targets below 50% health.',
                                        upgrades: {
                                            left: {
                                                name: 'Predatory Instincts',
                                                desc: 'Killing an enemy with this skill resets the cooldown.',
                                            },
                                            right: {
                                                name: 'Rake',
                                                desc: 'Inflicts a heavy bleed on targets above 50% health.',
                                            }
                                        }
                                    },
                                    right: {
                                        name: 'Swoop de Loop',
                                        desc: 'You can use Swoop twice in a row. You no longer attack on landing.',
                                        upgrades: {
                                            left: {
                                                name: 'Catch the Wind',
                                                desc: 'Move 33% faster (5s) after the second Swoop.',
                                            },
                                            right: {
                                                name: 'Shake It Off',
                                                desc: 'Swoop can be used to break free from being stunned or launched.',
                                            }
                                        }
                                    }
                                }
                            },
                            q: {
                                name: 'Blade Dance',
                                desc: 'Spinning attack that lets you move quickly.',
                                upgrades: {
                                    left: {
                                        name: 'Cyclone',
                                        desc: 'Radius you hit is doubled.',
                                        upgrades: {
                                            left: {
                                                name: 'Deadly Dance',
                                                desc: 'Blade Dance inflicts bleeding on hit. (3s)',
                                            },
                                            right: {
                                                name: 'Burden of Prey',
                                                desc: 'Applies Cripple to enemies hit. (Slow + Grounded)',
                                            }
                                        }
                                    },
                                    right: {
                                        name: 'Windborne',
                                        desc: 'Blade Dance drains no stamina.',
                                        upgrades: {
                                            left: {
                                                name: 'Hard Target',
                                                desc: 'During Blade Dance, deflect projectiles from front.',
                                            },
                                            right: {
                                                name: 'Windswept',
                                                desc: 'The cooldown for Blade Dance is halved if you do not hit anyone with it.',
                                            }
                                        }
                                    }
                                }
                            },
                            e: {
                                name: 'Fang',
                                desc: 'Sends out your pet to attack. (Bleeds target for 5s.)',
                                upgrades: {
                                    left: {
                                        name: 'Pounce',
                                        desc: 'On hit, Fang deals 250 armor-ignoring damage.',
                                        upgrades: {
                                            left: {
                                                name: 'Gnawing Out',
                                                desc: 'On hit, Fang breaks target\'s armor. (5s)',
                                            },
                                            right: {
                                                name: 'Ankle Biter',
                                                desc: 'Fang slows enemies he is attacking. (4s)',
                                            }
                                        }
                                    },
                                    right: {
                                        name: 'Unity',
                                        desc: 'TAP [e | skill] AGAIN: Appear at Fang\'s target. (Fang stops attacking.)',
                                        upgrades: {
                                            left: {
                                                name: 'Celerity',
                                                desc: 'When you teleport, gain Haste (3s)',
                                            },
                                            right: {
                                                name: 'Disruption',
                                                desc: 'When you teleport, interrupt Fang\'s target',
                                            }
                                        }
                                    }
                                }
                            },
                            r: {
                                name: 'Blur',
                                desc: 'Rush forward in a blur, bleeding all enemies you pass.',
                                upgrades: {
                                    left: {
                                        name: 'Renewed Focus',
                                        desc: 'On use, resets all your skill cooldowns.',
                                    },
                                    right: {
                                        name: 'Resurgence',
                                        desc: 'On use, you regain stamina.',
                                    }
                                }
                            },
                        },
                        passives: [
                            [
                                {
                                    name: 'Bird of Prey',
                                    desc: '[rmb | skill]: You can use Swoop more often.'
                                },
                                {
                                    name: 'Equilibrium',
                                    desc: '[q | skill]: Blade dance lasts 50% longer.'
                                },
                            ],
                            [
                                {
                                    name: 'Precision',
                                    desc: 'Crit chance builds faster.'
                                },
                                {
                                    name: 'En Garde',
                                    desc: '+10 front armor, +20 while attacking.'
                                },
                            ],
                            [
                                {
                                    name: 'Pure Escapism',
                                    desc: 'Lose debuffs when you dodge. (Once every 20s.)'
                                },
                                {
                                    name: 'Easy Strider',
                                    desc: 'You move 10% faster and sprinting drains stamina 25% slower.'
                                },
                            ],
                            [
                                {
                                    name: 'Hero\'s Might',
                                    desc: '+10% damage'
                                },
                                {
                                    name: 'Hero\'s Vitality',
                                    desc: '+15% maximum health'
                                },
                            ]
                        ]
                    },
                    aisling: {
                        id: 'aisling',
                        name: 'Aisling',
                        playstyle: 'Young warrior',
                        flavor: {
                            text: 'Aisling carries her father\'s sword—and her father\'s ghost—into battle.'
                        },
                        skills: {
                            lmb: {
                                name: 'Slash',
                                desc: 'Melee attack combo.',
                                upgrades: {
                                    left: {
                                        name: 'Father\'s Lessons',
                                        desc: 'Slash has increased range and can hit up to 3 targets.',
                                        upgrades: {
                                            left: {
                                                name: 'Father\'s Flame',
                                                desc: 'You deal more damage to Burning enemies.',
                                            },
                                            right: {
                                                name: 'Father\'s Reproof',
                                                desc: 'Weakens enemies with each hit. (-5% damage, stacks up to 5 times)',
                                            }
                                        }
                                    },
                                    right: {
                                        name: 'Spectral Blade',
                                        desc: 'If Slash misses, you send out a Spectral Wave projectile',
                                        upgrades: {
                                            left: {
                                                name: 'Spectral Might',
                                                desc: 'Allies hit by Spectral Wave gain +25% damage. (5s)',
                                            },
                                            right: {
                                                name: 'Spectral Defence',
                                                desc: 'Allies hit by Spectral Wave gain +20 armor. (5s)',
                                            }
                                        }
                                    }
                                }
                            },
                            rmb: {
                                name: 'Cador\'s Charge',
                                desc: 'Cador moves to target location. Deals high area damage',
                                upgrades: {
                                    left: {
                                        name: 'Cador\'s Reach',
                                        desc: 'Cador\'s Charge hits a larger area.',
                                        upgrades: {
                                            left: {
                                                name: 'Cador\'s Might',
                                                desc: 'Cador\'s Charge boosts Cador\'s damage by 25%. (6s)',
                                            },
                                            right: {
                                                name: 'Cador\'s Restoration',
                                                desc: 'Cador\'s Charge heals Cador for 175 per enemy hit.',
                                            }
                                        }
                                    },
                                    right: {
                                        name: 'Cador\'s Rage',
                                        desc: 'Cador\'s Charge hits multiple times.',
                                        upgrades: {
                                            left: {
                                                name: 'Burning Rage',
                                                desc: 'Cador\'s Charge inflicts burning. (4.5s)',
                                            },
                                            right: {
                                                name: 'Shattering Rage',
                                                desc: 'Cador\'s Charge breaks armor. (5s)',
                                            }
                                        }
                                    }
                                }
                            },
                            q: {
                                name: 'Cador\'s War Cry',
                                desc: 'Cador moves to target location. Interrupts and slows',
                                upgrades: {
                                    left: {
                                        name: 'Intimidation',
                                        desc: 'Cador\'s War Cry inflicts Weakness. (5s)',
                                        upgrades: {
                                            left: {
                                                name: 'Dread',
                                                desc: 'Cador\'s War Cry immobilizes enemies. (1.5s)',
                                            },
                                            right: {
                                                name: 'Chastise',
                                                desc: 'Cador\'s War Cry stuns attacking enemies.',
                                            }
                                        }
                                    },
                                    right: {
                                        name: 'Spectral Barrier',
                                        desc: 'Cador creates a projectile barrier (3s). No longer interrupts.',
                                        upgrades: {
                                            left: {
                                                name: 'Spectral Armor',
                                                desc: 'Allies inside the barrier have +40 armor.',
                                            },
                                            right: {
                                                name: 'Spectral Lens',
                                                desc: 'Allies inside the barrier have 100% crit chance.',
                                            }
                                        }
                                    }
                                }
                            },
                            e: {
                                name: 'Into The Blade',
                                desc: 'Recall Sir Cador. Gain Cador\'s Blade (DMG boost).',
                                upgrades: {
                                    left: {
                                        name: 'Swift Return',
                                        desc: 'On use, +25% MOVE SPEED (3s)',
                                        upgrades: {
                                            left: {
                                                name: 'Ephemeral Sprint',
                                                desc: 'Into the Blade hides your presence. Invisibility (3s)',
                                            },
                                            right: {
                                                name: 'Ardent Blade',
                                                desc: 'Cador\'s Blade parries projectiles. Deflects 1 projectile every 5s.',
                                            }
                                        }
                                    },
                                    right: {
                                        name: 'Shielding Presence',
                                        desc: 'Cador protects you from harm. +35% ARMOR BOOST (6s)',
                                        upgrades: {
                                            left: {
                                                name: 'Aura of Healing',
                                                desc: 'While performing Into the Blade: Cador heals you and nearby allies.',
                                            },
                                            right: {
                                                name: 'Pure of Spirit',
                                                desc: 'Cador applies Purity to all nearby allies. Debuff Immunity (6s)',
                                            }
                                        }
                                    }
                                }
                            },
                            r: {
                                name: 'Terrify',
                                desc: 'Enemies near you and Cador are Launched. Fear (Slow+Weak) 4/6/8s',
                                upgrades: {
                                    left: {
                                        name: 'Nigh Invulnerable',
                                        desc: 'You take 90% less damage while performing [F].',
                                    },
                                    right: {
                                        name: 'Resurgence',
                                        desc: 'On use, you regain stamina.',
                                    }
                                }
                            },
                        },
                        passives: [
                            [
                                {
                                    name: 'Relentless Attack',
                                    desc: '[lmb | skill]: Your full attack combo has no recovery time.'
                                },
                                {
                                    name: 'Total Recall',
                                    desc: '[e | skill]: 3s shorter cooldown. No longer prevents you from moving.'
                                },
                            ],
                            [
                                {
                                    name: 'Precision',
                                    desc: 'Crit chance builds faster.'
                                },
                                {
                                    name: 'En Garde',
                                    desc: '+10 front armor, +20 while attacking.'
                                },
                            ],
                            [
                                {
                                    name: 'Calling the Shots',
                                    desc: 'When you debuff a foe, nearby allies gain +10% damage for 5s. (Once per 5s.)'
                                },
                                {
                                    name: 'Another\'s Keeper',
                                    desc: '+10% healing power. Gain focus when you buff or heal an ally. (Once per 5s.)'
                                },
                            ],
                            [
                                {
                                    name: 'Hero\'s Might',
                                    desc: '+10% damage.'
                                },
                                {
                                    name: 'Hero\'s Vitality',
                                    desc: '+15% maximum health.'
                                },
                            ]
                        ]
                    },
                    wu: {
                        id: 'wu',
                        name: 'Wu',
                        playstyle: 'Martial Artist',
                        flavor: {
                            text: ''
                        },
                        skills: {
                            lmb: {
                                name: 'Rain of Blows',
                                desc: 'Rapid melee attack combo.',
                                upgrades: {
                                    left: {
                                        name: 'Flowing Fist',
                                        desc: 'Deals more damage after hitting with any other skill.',
                                        upgrades: {
                                            left: {
                                                name: 'Rupture',
                                                desc: 'Inflict bleeding vs. stunned, launched, dazed, or interrupted foes. (4s)',
                                            },
                                            right: {
                                                name: 'Flowing Stance',
                                                desc: 'After Flowing Fist, each strike gives you +10 armor. (3s, stacks up to 3 times)',
                                            }
                                        }
                                    },
                                    right: {
                                        name: 'Triple Tiger Kick',
                                        desc: 'After sprinting, your third [lmb | skill] attack interrupts.',
                                        upgrades: {
                                            left: {
                                                name: 'Hop To It',
                                                desc: 'After dodging, you may perform Triple Tiger Kick [lmb | skill].',
                                            },
                                            right: {
                                                name: 'Kick It Up a Notch',
                                                desc: 'After Splash Kick [rmb | skill], you may perform Triple Tiger Kick [lmb | skill].',
                                            }
                                        }
                                    }
                                }
                            },
                            rmb: {
                                name: 'Splash Kick',
                                desc: 'Rising kick that pushes enemies. [rmb | skill] AGAIN: Powerful downward kick.',
                                upgrades: {
                                    left: {
                                        name: 'Splashdown',
                                        desc: 'Downward Kick from [rmb | skill] slows your target. (3s)',
                                        upgrades: {
                                            left: {
                                                name: 'Burst the Dam',
                                                desc: 'Downward Kick from [rmb | skill] breaks target\'s armor. (4s)',
                                            },
                                            right: {
                                                name: 'Forceful Current',
                                                desc: 'Downward Kick from [rmb | skill] interrupts on hit.',
                                            }
                                        }
                                    },
                                    right: {
                                        name: 'Boundless Energy',
                                        desc: 'When you land, cooldown is reduced to 1s if you have stamina.',
                                        upgrades: {
                                            left: {
                                                name: 'Rising Tide',
                                                desc: 'After Crashing Waves [q | skill], Splash Kick launches foes.',
                                            },
                                            right: {
                                                name: 'Ride the Rapids',
                                                desc: 'After Tonguelash [e | skill], Splash Kick grants deflection (3s) and speed boost (5s).',
                                            }
                                        }
                                    }
                                }
                            },
                            q: {
                                name: 'Crashing Waves',
                                desc: 'Two attacks. Second attack interrupts.',
                                upgrades: {
                                    left: {
                                        name: 'Intercepting Fist',
                                        desc: 'Weaken enemies on hit (50% damage for 5s).',
                                        upgrades: {
                                            left: {
                                                name: 'Temple Strike',
                                                desc: 'Second strike Stuns. (+4s cooldown.)',
                                            },
                                            right: {
                                                name: 'Dim Mak',
                                                desc: 'Hitting raises your crit chance to 100%.',
                                            }
                                        }
                                    },
                                    right: {
                                        name: 'Rushing Water',
                                        desc: 'Second attack is replaced with a roll forward. Pushes enemies on bump.',
                                        upgrades: {
                                            left: {
                                                name: 'Splash of Least Resistance',
                                                desc: 'Recharges Splash Kick [rmb | skill] if Crashing Waves does not bump an enemy.',
                                            },
                                            right: {
                                                name: 'Fluid Reactions',
                                                desc: 'During Crashing Waves, you have projectiles deflection and 80 armor, but move slower.',
                                            }
                                        }
                                    }
                                }
                            },
                            e: {
                                name: 'Tongue Lashing',
                                desc: 'Pull one enemy toward you.',
                                upgrades: {
                                    left: {
                                        name: 'Barbed Tongue',
                                        desc: 'Tonguelash deals triple damage and raises your crit chance.',
                                        upgrades: {
                                            left: {
                                                name: 'Poisoned Tongue',
                                                desc: 'Enemies struck by Tonguelash are poisoned. (5s)',
                                            },
                                            right: {
                                                name: 'Taste for Blood',
                                                desc: 'Hitting with Tonguelash gives health regeneration.',
                                            }
                                        }
                                    },
                                    right: {
                                        name: 'Whet Your Appetite',
                                        desc: 'On hit, [rmb | skill] and [q | skill] recharge. (+10s Tonguelash cooldown)',
                                        upgrades: {
                                            left: {
                                                name: 'Whiplash',
                                                desc: '[e | skill], [rmb | skill]: [rmb | skill] dazes for 2s.',
                                            },
                                            right: {
                                                name: 'Wave Goodbye',
                                                desc: '[e | skill], [q | skill]: Q first strike launches. (+6s Q cooldown.)',
                                            }
                                        }
                                    }
                                }
                            },
                            r: {
                                name: 'Typhoon\'s Fury',
                                desc: 'Charging uppercut that launches and deals high damage.',
                                upgrades: {
                                    left: {
                                        name: 'Nigh Invulnerable',
                                        desc: 'You take 90% less damage while performing [rmb | skill].',
                                    },
                                    right: {
                                        name: 'Resurgence',
                                        desc: 'On use, you regain stamina.',
                                    }
                                }
                            },
                        },
                        passives: [
                            [
                                {
                                    name: 'Splash Zone',
                                    desc: '[rmb | skill],[rmb | skill] hits a larger area and can hit multiple foes.'
                                },
                                {
                                    name: 'Wave Pattern',
                                    desc: '[q | skill] has shorter cooldown.'
                                },
                            ],
                            [
                                {
                                    name: 'Precision',
                                    desc: 'Crit chance builds faster.'
                                },
                                {
                                    name: 'En Garde',
                                    desc: '+10 front armor, +20 while attacking.'
                                },
                            ],
                            [
                                {
                                    name: 'Shredder',
                                    desc: '30% armor penetration.'
                                },
                                {
                                    name: 'Bloody Minded',
                                    desc: 'Immunity to Weakness. Recover from Daze twice as fast.'
                                },
                            ],
                            [
                                {
                                    name: 'Hero\'s Might',
                                    desc: '+10% damage.'
                                },
                                {
                                    name: 'Hero\'s Vitality',
                                    desc: '+15% maximum health.'
                                },
                            ]
                        ]
                    }
                }
            }
        }
    ])
