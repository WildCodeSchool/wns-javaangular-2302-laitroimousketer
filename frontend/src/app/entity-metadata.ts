import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { Ticket } from './features/ticket/models/ticket';
import { User } from './core/models/user.model';
import { Address } from './core/models/address.model';
import { Category } from './features/ticket/models/category';
import { Priority } from './features/ticket/models/Priority';
import { Status } from './features/ticket/models/Status';
const entityMetadata: EntityMetadataMap = {
  tickets: {
    selectId: (ticket: Ticket) => ticket.id,
  },
  users: {
    selectId: (user: User) => user.id,
  },
  address: {
    selectId: (address: Address) => address.id,
  },
  categories: {
    selectId: (category: Category) => category.id,
  },
  priorities: {
    selectId: (priority: Priority) => priority.id,
  },
  status: {
    selectId: (status: Status) => status.id,
  },
};
// pluralNames est utilisé pour spécifier les noms pluriels pour les entités lorsque le nom de l'entité dans le store ne peut pas être déduit du nom de l'entité lui-même.
// Par exemple, si le nom de votre entité est Ticket, le nom dans le store serait tickets.
// Si votre entité a un nom qui ne suit pas cette convention de manière automatique,
// vous pouvez utiliser pluralNames pour spécifier explicitement ces noms.
const pluralNames = {
  tickets: 'tickets',
  users: 'users',
  priorities: 'priorities',
  categories: 'categories',
  status: 'status',
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
