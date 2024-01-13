import { type Contribution } from '../../domain/Github.domain.ts';
import contributionItemVariants from './variants.ts';
import Tooltip from '../Tooltip/index.ts';
import TooltipContent from './TooltipContent.tsx';

interface Props {
  contribution: Contribution;
  color: 'default' | 'primary' | 'secondary';
}

export const Item: React.FC<Props> = ({ contribution: c, color }) => {
  return (
    <Tooltip content={<TooltipContent contribution={c} />}>
      <span className={contributionItemVariants({ count: c.level, color })} slot="trigger"></span>
    </Tooltip>
  );
};

export default Item;
