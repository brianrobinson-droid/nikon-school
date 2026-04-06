import * as migration_20260405_145855 from './20260405_145855';
import * as migration_20260405_184235 from './20260405_184235';
import * as migration_20260406_082102 from './20260406_082102';
import * as migration_20260406_100930_advisor_contact_group from './20260406_100930_advisor_contact_group';

export const migrations = [
  {
    up: migration_20260405_145855.up,
    down: migration_20260405_145855.down,
    name: '20260405_145855',
  },
  {
    up: migration_20260405_184235.up,
    down: migration_20260405_184235.down,
    name: '20260405_184235',
  },
  {
    up: migration_20260406_082102.up,
    down: migration_20260406_082102.down,
    name: '20260406_082102',
  },
  {
    up: migration_20260406_100930_advisor_contact_group.up,
    down: migration_20260406_100930_advisor_contact_group.down,
    name: '20260406_100930_advisor_contact_group',
  },
];
