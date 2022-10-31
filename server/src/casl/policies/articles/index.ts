import { AppAbility } from 'src/casl/casl-ability.factory';
import { IPolicyHandler } from 'src/casl/policies/policies.decorator';
import { Action } from 'src/enums/action.enum';

export class ManageArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Manage, 'Article');
  }
}
export class ReadArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, 'Article');
  }
}

export class UpdateArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, 'Article');
  }
}

export class DeleteArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Delete, 'Article');
  }
}
