import React, {useEffect} from 'react';

function ClientList(props) {

  const { clients } = props

  return (
    <div>
      <h1>ClientList</h1>
      {/*{clients.map((x,i) => {*/}
      {/*  return <h3 key={i}>{x.name}</h3>*/}
      {/*})}*/}
    </div>

  );
}

export default ClientList;