import React from 'react';

const Iframe = props => {
  return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} id={props.id}/>);
}

export default Iframe;