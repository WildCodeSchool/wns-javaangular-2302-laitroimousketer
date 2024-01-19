import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { Ticket } from './core/models/ticket.model';
import { User } from './core/models/user.model';
import { Address } from './core/models/address.model';
import { Category } from './core/models/category.model';
import { Priority } from './core/models/priority.model';
import { Status } from './core/models/status.model';
import { Media } from './core/models/media.model';

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
  media: {
    selectId: (media: Media) => media.id,
  },
  chat: {
    selectId: (chat: Media) => chat.id,
  }
};
// pluralNames est utilisé pour spécifier les noms pluriels pour les entités lorsque le nom de l'entité dans le store ne peut pas être déduit du nom de l'entité lui-même.
// Par exemple, si le nom de votre entité est Ticket, le nom dans le store serait tickets.
// Si votre entité a un nom qui ne suit pas cette convention de manière automatique,
// vous pouvez utiliser pluralNames pour spécifier explicitement ces noms.
const pluralNames = {

};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
