import { AppAbility } from 'src/casl/casl-ability.factory';
import { IPolicyHandler } from 'src/casl/policies/policies.decorator';
import { Action } from 'src/enums/action.enum';

export class ReadArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, 'Article');
  }
}
