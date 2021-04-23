import { Address } from "./person/address";
import { AgeClass } from "./person/age-class.enum";
import { Person } from "./person/person";
import { PhoneNumber } from "./person/phone-number";

export const TEST_PERSONS: Person[] = [
    new Person(
        '02999',
        'Obama',
        ['Barack'],
        ['Hussein'],
        '1961-08-04',
        AgeClass['ADULT'],
        ['barack.obama@potus.gov'],
        [new PhoneNumber( '+1 212 555 3400', true )],
        new Address(
            'US',
            ['2500 W. Golf Road', 'Hoffman Estates', 'IL 60169-1114']
        )
    ),
    new Person(
        '03457',
        'Tels',
        ['Benjamin', 'Extrafakename'],
        ['Ze\'ev', 'Extrafakename'],
        '1978-03-12',
        AgeClass['ADULT'],
        ['bzt@bentels.nl', 'bzt@bentels.dyndns.org'],
        [new PhoneNumber('+31614435308', true), new PhoneNumber('+31 40 252 13 94', false)],
        new Address(
            'NL',
            ['Twickel 13', '5655 JK', 'Eindhoven']
        )
    ),
    new Person(
        '08888',
        'Marron',
        ['François'],
        ['Philippe'],
        '1985-06-05',
        AgeClass['ADULT'],
        ['francois.philippe.marron@tomtel.fr', 'fmarron@gmail.com'],
        [new PhoneNumber('+33-6-78679-0087', true)],
        new Address(
            'FR',
            ['32 Rue de Fleurs', '33500 LIBOURNE']
        )
    ),
    new Person(
        '08889',
        'Marron-Chevreux',
        ['Marie', 'Elle'],
        [],
        '1988-04-26',
        AgeClass['ADULT'],
        ['marie.marron@tomtel.fr', 'memarron@gmail.com'],
        [new PhoneNumber('+33-6-78506-9089', true)],
        new Address(
            'FR',
            ['32 Rue de Fleurs', '33500 LIBOURNE']
        )
    ),
    new Person(
        '08890',
        'Marron',
        ['Thomas'],
        [],
        '2014-01-06',
        AgeClass['CHILD'],
        ['thomas.marron@tomtel.fr'],
        [new PhoneNumber('+33-6-66506-9089', true)],
        new Address(
            'FR',
            ['32 Rue de Fleurs', '33500 LIBOURNE']
        )
    ),
    new Person(
        '08891',
        'Marron',
        ['Jeanelle'],
        [],
        '2017-11-18',
        AgeClass['CHILD'],
        ['jeanelle.marron@tomtel.fr'],
        [],
        new Address(
            'FR',
            ['32 Rue de Fleurs', '33500 LIBOURNE']
        )
    ),
    new Person(
        '08892',
        'Marron',
        ['Manou'],
        [],
        '2020-07-18',
        AgeClass['INFANT'],
        [],
        [],
        new Address(
            'FR',
            ['32 Rue de Fleurs', '33500 LIBOURNE']
        )
    ),
    new Person(
        '19198',
        'Tels',
        ['Betsy'],
        [],
        '1942-05-17',
        AgeClass['ADULT'],
        ['betsy@bentels.nl'],
        [new PhoneNumber('+31 6 211 720 53', true)],
        new Address(
            'NL',
            ['Twickel 13', '5655 JK', 'Eindhoven']
        ),
        new Address(
            'NL',
            ['Postbus 45667', '5778 EA', 'Eindhoven']
        )
    ),
    new Person(
        '20007',
        'Johansson',
        ['Wilhelm', 'Jakob'],
        ['Bernhardt', 'Maria'],
        '1992-05-09',
        AgeClass['ADULT'],
        ['w.j.johansson@gmail.com'],
        [new PhoneNumber('+34 61 211 720 53', true)],
        new Address(
            'DE',
            ['Karlsstrasse 23', '60637', 'Karlsruhe']
        )
    ),
    new Person(
        '20008',
        'Johansson',
        ['Jimmy'],
        [],
        '2005-09-21',
        AgeClass['CHILD'],
        [],
        [new PhoneNumber('+34 61 211 720 53', true)],
        new Address(
            'DE',
            ['Karlsstrasse 23', '60637', 'Karlsruhe']
        )
    ),
    new Person(
        '20019',
        'Langkous',
        ['Pippi'],
        [],
        '2019-08-01',
        AgeClass['INFANT'],
        [],
        [],
        new Address(
            'SE'
        )
    )
];