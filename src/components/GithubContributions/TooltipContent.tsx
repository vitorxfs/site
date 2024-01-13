import type { Contribution } from '../../domain/Github.domain';
import { changeDateFormat } from '../../helpers/date.helper';
import React from 'react';

interface Props {
  contribution: Contribution;
}

export const TooltipContent: React.FC<Props> = ({ contribution }) => {
  const count = contribution.count;

  return (
    <div>
      <p className="font-bold">{changeDateFormat(contribution.date, 'YYYY-MM-DD', 'DD/MM/YYYY')}</p>

      <p>
        {count === 0 ? 'Nenhuma' : count}
        {` `}
        {count <= 1 ? 'contribuição' : 'contribuições'}
      </p>
    </div>
  );
};

export default TooltipContent;
