import React from 'react';
import { ICFaSort, ICFaSortDown, ICFaSortUp } from '@/utils/icons';

const SortUi = (props: any) => {

  const { callTo, keyToCall, typeSort, activeSortKey } = props;

  function sortAction(calledWith: string) {
    callTo(keyToCall, calledWith);
  }

  return (
    <div className='ps-2 h-100 d-inline align-items-center cp' >
      {activeSortKey == keyToCall ?
        <>
          {typeSort == "desc" ? <span onClick={sortAction.bind('', 'asc')} > <ICFaSortDown /> </span> : <span onClick={sortAction.bind('', 'desc')} ><ICFaSortUp /> </span>}
        </>
        :
        <span onClick={sortAction.bind('', 'asc')} ><ICFaSort /> </span>
      }
    </div>
  );
}

export default SortUi;