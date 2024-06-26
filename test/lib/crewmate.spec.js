import { expect } from 'chai';
import crewmate from '../../src/lib/crewmate.js';
import { checkIdsAndTypes } from '../testUtils.js';

describe('Crewmate library', function () {
  before(function () {
    checkIdsAndTypes(crewmate.ABILITY_IDS, crewmate.ABILITY_TYPES);
  });

  it('ability types should not reference an invalid class', function () {
    const invalidClass = !!Object.values(crewmate.ABILITY_TYPES).find((a) => a.class && !crewmate.getClass(a.class));
    expect(invalidClass).to.eql(false);
  });

  it('ability types should not reference an invalid title', function () {
    const invalidTitle = !!Object.values(crewmate.ABILITY_TYPES).find((a) =>
      !!Object.keys(a.titles || {}).find((t) => !crewmate.getTitle(t))
    );
    expect(invalidTitle).to.eql(false);
  });

  it('ability types should not reference an invalid trait', function () {
    const invalidTrait = !!Object.values(crewmate.ABILITY_TYPES).find((a) =>
      !!Object.keys(a.traits || {}).find((t) => !crewmate.getTrait(t))
    );
    expect(invalidTrait).to.eql(false);
  });

  it('should unpack appearance', function () {
    const appearance = crewmate.unpackAppearance('0x2000020007000000092');
    expect(appearance).to.deep.equal({
      gender: 2,
      body: 9,
      face: 0,
      hair: 7,
      hairColor: 2,
      clothes: 32,
      head: 0,
      item: 0
    });
  });

  it('should return valid Arvadian traits', function () {
    let traits;
    const { TRAIT_IDS } = crewmate;
    const selectedTraits = [TRAIT_IDS.DRIVE_SURVIVAL];

    traits = crewmate.nextTraits(2, 1, selectedTraits);
    expect(traits).to.eql([
      TRAIT_IDS.FRANTIC,
      TRAIT_IDS.AMBITIOUS,
      TRAIT_IDS.CREATIVE,
      TRAIT_IDS.PRAGMATIC,
      TRAIT_IDS.FLEXIBLE,
      TRAIT_IDS.STEADFAST,
      TRAIT_IDS.CAUTIOUS,
      TRAIT_IDS.ADVENTUROUS
    ]);

    selectedTraits.push(TRAIT_IDS.FLEXIBLE);
    traits = crewmate.nextTraits(2, 1, selectedTraits);
    expect(traits).to.eql([TRAIT_IDS.COUNCIL_MODERATE, TRAIT_IDS.INDEPENDENT_MODERATE, TRAIT_IDS.INDEPENDENT_RADICAL]);

    selectedTraits.push(TRAIT_IDS.INDEPENDENT_RADICAL);
    selectedTraits.push(TRAIT_IDS.REFINER);
    selectedTraits.push(TRAIT_IDS.THOUGHTFUL);
    traits = crewmate.nextTraits(2, 1, selectedTraits);
    expect(traits).to.eql([TRAIT_IDS.COMMUNAL, TRAIT_IDS.ENTERPRISING, TRAIT_IDS.OPPORTUNISTIC]);

    selectedTraits.push(TRAIT_IDS.COMMUNAL);
    traits = crewmate.nextTraits(2, 1, selectedTraits);
    expect(traits).to.eql([
      TRAIT_IDS.BUSTER,
      TRAIT_IDS.MOGUL,
      TRAIT_IDS.SCHOLAR,
      TRAIT_IDS.OPERATOR,
      TRAIT_IDS.LOGISTICIAN,
      TRAIT_IDS.EXPERIMENTER
    ]);

    selectedTraits.push(TRAIT_IDS.OPERATOR);
    traits = crewmate.nextTraits(2, 1, selectedTraits);
    expect(traits).to.eql([TRAIT_IDS.BUILDER, TRAIT_IDS.PROSPECTOR, TRAIT_IDS.BUSTER]);
  });

  it('should return valid Adalian traits', function () {
    let traits;
    const { TRAIT_IDS } = crewmate;
    const selectedTraits = [TRAIT_IDS.DRIVE_COMMAND];

    traits = crewmate.nextTraits(4, 3, selectedTraits);
    expect(traits).to.eql([TRAIT_IDS.SURVEYOR, TRAIT_IDS.RECYCLER, TRAIT_IDS.PROSPECTOR]);

    selectedTraits.push(TRAIT_IDS.SURVEYOR);
    traits = crewmate.nextTraits(4, 3, selectedTraits);
    expect(traits).to.eql([TRAIT_IDS.RIGHTEOUS, TRAIT_IDS.COMMUNAL, TRAIT_IDS.IMPARTIAL, TRAIT_IDS.OPPORTUNISTIC]);

    traits = crewmate.nextTraits(1, 3, [4]);
    expect(traits).to.eql([7, 14, 22, 11, 6, 17]);
  });
});
